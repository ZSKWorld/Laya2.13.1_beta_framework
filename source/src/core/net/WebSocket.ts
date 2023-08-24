import { GameEvent } from "../common/GameEvent";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { userData } from "../userData/UserData";
import { NetMessage } from "./enum/NetMessage";

const logger = Logger.Create("WebSocket", true);

class WebSocket extends Observer {
    private _url: string = "ws://192.168.71.29:8003";
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
        let msg: UserOutput = JSON.parse(message);
        if (msg && !msg.error) {
            if (msg.syncInfo)
                this.dispatch(NetMessage.SyncInfo, msg.syncInfo);
            if (this._current && this._current.cmd == msg.cmd) {
                msg = Object.assign(msg, this._current);
                this._current = null;
            }
            this.dispatch(`NetMsg_${ msg.cmd[ 0 ].toUpperCase() + msg.cmd.substring(1) }`, msg);
        } else {
            this.dispatch(GameEvent.NetMsgError, msg);
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