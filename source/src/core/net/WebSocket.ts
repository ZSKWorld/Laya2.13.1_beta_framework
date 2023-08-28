import { GameEvent } from "../common/GameEvent";
import { Observer } from "../libs/event/Observer";
import { NetMessage } from "./enum/NetMessage";

class WebSocket extends Observer {
    private _url: string = "ws://192.168.71.71:8007";
    private _socket: Laya.Socket;
    private _waitList: UserInput[];
    private _current: UserInput;
    get connected(): boolean { return this._socket.connected; }

    init(): void {
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

    sendMsg(msg: UserInput): void {
        const { _current, _waitList } = this;
        if (_current && msg.cmd == _current.cmd) return;
        if (_waitList.length && _waitList.find(v => v.cmd == msg.cmd)) return;
        _waitList.push(msg);
        this.executeWaitMsg();
    }

    private onSocketOpen(): void {
        this.dispatch(GameEvent.SocketOpened);
        this.executeWaitMsg();
    }

    private onSocketMessage(message: string): void {
        const output: UserOutput = JSON.parse(message);
        if (output && !output.error) {
            if (output.syncInfo)
                this.dispatch(NetMessage.SyncInfo, output.syncInfo);
            const input = this._current;
            if (this._current && this._current.cmd == output.cmd) {
                this._current = null;
            }
            this.dispatch(`NetMsg_${ output.cmd[ 0 ].toUpperCase() + output.cmd.substring(1) }`, [output, input]);
        } else {
            this.dispatch(GameEvent.NetMsgError, output);
            this._current = null;
        }

        this._socket.input.clear();
        this.executeWaitMsg();
    }

    private onSocketError(e): void { }

    private onSocketClose(): void {
        this._current = null;
        this._waitList.length = 0;
        this.dispatch(GameEvent.SocketClosed);
        this._socket.connectByUrl(this._url);
    }

    private executeWaitMsg(): void {
        if (this.connected && !this._current && this._waitList.length > 0) {
            this._current = this._waitList.shift();
            this._current.token = this._current["account"] || userData.account;
            this._socket.send(JSON.stringify(this._current));
        }
    }
}

export const websocket = new WebSocket();
windowImmit("websocket", websocket)