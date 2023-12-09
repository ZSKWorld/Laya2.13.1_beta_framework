import { GameEvent } from "../common/GameEvent";
import { Observer } from "../libs/event/Observer";
import { MessageType } from "./enum/MessageType";
import { NetMessage } from "./enum/NetMessage";

class WebSocket extends Observer {
    private _url: string = "ws://192.168.71.91:8007";
    private _socket: Laya.Socket;
    private _waitList: UserInput[];
    private _current: UserInput;
    get connected() { return this._socket.connected; }

    init() {
        if (!this._waitList) {
            this._waitList = [];
            this._socket = new Laya.Socket();
            this._socket.connectByUrl(this._url);
            this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this._socket.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
            this._socket.on(Laya.Event.ERROR, this, this.onSocketError);
            this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        }
    }

    sendMsg(msg: UserInput) {
        const { _current, _waitList } = this;
        if (_current && msg.cmd == _current.cmd) return;
        if (_waitList.length && _waitList.find(v => v.cmd == msg.cmd)) return;
        _waitList.push(msg);
        this.executeWaitMsg();
    }

    private onSocketOpen() {
        this.dispatch(GameEvent.SocketOpened);
        this.executeWaitMsg();
    }

    private onSocketMessage(message: string): void {
        const output: UserOutput | UserNotify = JSON.parse(message);
        switch (output.type) {
            case MessageType.Response: this.dealResponse(output); break;
            case MessageType.Notify: this.dealNotify(output); break;
        }
    }

    private dealResponse(output: UserOutput) {
        const input = this._current;
        let netMsg = `NetMsg_${ output.cmd[0].toUpperCase() + output.cmd.substring(1) }`;
        if (!output.error) {
            if (input && input.cmd != output.cmd) {
                Logger.Error("message error", input, output);
                throw new Error();
            }
            if (output.syncInfo)
                this.dispatch(NetMessage.SyncInfo, output.syncInfo);
        } else {
            this.dispatch(GameEvent.NetMsgError, output);
            netMsg += `_Error`;
        }
        this.dispatch(netMsg, [output, input]);
        this._socket.input.clear();
        this._current = null;
        this.executeWaitMsg();
    }

    private dealNotify(output: UserNotify) {
        if (output && output.syncInfo)
            this.dispatch(NetMessage.SyncInfo, output.syncInfo);
        this.dispatch(output.cmd, output);
        this._socket.input.clear();
    }

    private onSocketError(e) { }

    private onSocketClose() {
        this._current = null;
        this._waitList.length = 0;
        this.dispatch(GameEvent.SocketClosed);
        this._socket.connectByUrl(this._url);
    }

    private executeWaitMsg() {
        if (this.connected && !this._current && this._waitList.length > 0) {
            this._current = this._waitList.shift();
            this._current.token = this._current.token || userData.account.account;
            this._socket.send(JSON.stringify(this._current));
        }
    }
}

export const websocket = new WebSocket();
windowImmit("websocket", websocket)