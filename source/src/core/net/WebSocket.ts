import { Observer } from "../game/event/Observer";
import { MessageType } from "./enum/MessageType";
import { NetCMD } from "./enum/NetCMD";

const enum SocketState {
    /** 未连接 */
    Disconnect = "SocketState_Disconnect",
    /** 连接中 */
    Connecting = "SocketState_Connecting",
    /** 重连中 */
    Reconnecting = "SocketState_Reconnecting",
    /** 已连接 */
    Connected = "SocketState_Connected",
}

export const enum SocketEvent {
    /** 连接中 */
    Connecting = "SocketEvent_Connecting",
    /** 连接成功 */
    ConnectSuccess = "SocketEvent_ConnectSuccess",
    /** 连接失败 */
    ConnectFail = "SocketEvent_ConnectFail",
    /** 重连中 */
    Reconnecting = "SocketEvent_Reconnecting",
    /** 重连成功 */
    ReconnectSuccess = "SocketEvent_ReconnectSuccess",
    /** 重连失败 */
    ReconnectFail = "SocketEvent_ReconnectFail",
    /**
     * 消息错误
     * @param msg {@link IUserOutput} 错误消息
     */
    MsgError = "SocketEvent_MsgError",
    /** 连接关闭 */
    Close = "SocketEvent_Close",
}

export class WebSocket extends Observer {
    private static _inst: WebSocket;
    static get Inst() { return this._inst || (this._inst = new WebSocket()); }

    private _url: string = "ws://192.168.1.105:8007";
    private _socket: Laya.Socket;
    private _state: SocketState = SocketState.Disconnect;
    private _waitList: (IUserInput | Function)[] = [];
    private _current: IUserInput;
    private _curCb: Function;
    get state() { return this._state; }
    private set state(v) {
        const lastState = this._state;
        if (v == lastState) return;
        this._state = v;
        const events: SocketEvent[] = [];
        switch (lastState) {
            case SocketState.Disconnect:
                switch (v) {
                    case SocketState.Connecting: events.push(SocketEvent.Connecting); break;
                    case SocketState.Reconnecting: events.push(SocketEvent.Reconnecting); break;
                    case SocketState.Connected: Logger.error("状态错误 Disconnect => Connected"); break;
                    default: Logger.error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Connecting:
                switch (v) {
                    case SocketState.Disconnect: events.push(SocketEvent.ConnectFail, SocketEvent.Close); break;
                    case SocketState.Reconnecting: Logger.error("状态错误 Connecting => Reconnecting"); break;
                    case SocketState.Connected: events.push(SocketEvent.ConnectSuccess); break;
                    default: Logger.error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Reconnecting:
                switch (v) {
                    case SocketState.Disconnect: events.push(SocketEvent.ReconnectFail, SocketEvent.Close); break;
                    case SocketState.Connecting: Logger.error("状态错误 Reconnecting => Connecting"); break;
                    case SocketState.Connected: events.push(SocketEvent.ReconnectSuccess); break;
                    default: Logger.error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Connected:
                switch (v) {
                    case SocketState.Disconnect: events.push(SocketEvent.Close); break;
                    case SocketState.Connecting: Logger.error("状态错误 Connected => Connecting"); break;
                    case SocketState.Reconnecting: Logger.error("状态错误 Connected => Reconnecting"); break;
                    default: Logger.error("未知的状态", lastState, v); break;
                }
                break;
            default: Logger.error("未知的状态", lastState, v); break;
        }
        events.forEach(v => this.dispatch(v));
    }
    get connected() { return this.state == SocketState.Connected; }

    private constructor() { super(); }

    init() {
        if (!this._socket) {
            this._socket = new Laya.Socket();
            this._socket.on(Laya.Event.OPEN, this, this.onOpen);
            this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
            this._socket.on(Laya.Event.ERROR, this, this.onError);
            this._socket.on(Laya.Event.CLOSE, this, this.onClose);
            this.connect();
        }
    }

    connect() {
        this.state = SocketState.Connecting;
        this._socket.connectByUrl(this._url);
    }

    close() {
        this.state = SocketState.Disconnect;
        this._socket.close();
    }

    async send(input: IUserInput) {
        const data = await this.sendMsg(input);
        return data;
    }

    private sendMsg(msg: IUserInput) {
        const { _current, _waitList } = this;
        if (_current && msg.cmd == _current.cmd) return;
        if (_waitList.length && _waitList.find((v: any) => v.cmd == msg.cmd)) return;

        return new Promise<IUserOutput>(resolve => {
            _waitList.push(msg, resolve);
            this.executeWaitMsg();
        });
    }

    private onOpen(e: Event) {
        this.state = SocketState.Connected;
        this.executeWaitMsg();
    }

    private onMessage(message: string): void {
        const output: IUserOutput = JSON.parse(message);
        switch (output.type) {
            case MessageType.Response: this.dealResponse(output); break;
            case MessageType.Notify: this.dealNotify(output); break;
            default: Logger.error("unknown message type: ", output); break;
        }
    }

    private onError(e: Event) {

    }

    private onClose(e: Event) {
        if (this.state == SocketState.Disconnect) return;
        this.state = SocketState.Disconnect;
        this._current = null;
        this._curCb = null;
        this._waitList.length = 0;
        Laya.timer.once(1000, this, this.reconnect);
    }

    private executeWaitMsg() {
        const { connected, _current, _waitList, _socket } = this;
        if (connected && !_current && _waitList.length > 0) {
            this._current = <IUserInput>_waitList.shift();
            this._curCb = <Function>_waitList.shift();
            _socket.send(JSON.stringify(this._current));
        }
    }

    private dealResponse(output: IUserOutput) {
        const input = this._current;
        if (input && input.cmd == output.cmd) {
            const netMsg = `NetCMD_${ output.cmd[0].toUpperCase() + output.cmd.substring(1) }`;
            if (!output.error) {
                this.dispatch(NetCMD.SyncInfo, output.syncInfo);
                this.dispatch(netMsg, [output, input]);
            } else {
                this.dispatch(SocketEvent.MsgError, output);
                this.dispatch(`${ netMsg }_Error`, [output, input]);
            }
        } else {
            Logger.error("message error", input, output);
        }
        this._curCb?.(output);
        this._current = null;
        this._curCb = null;

        this._socket.input.clear();
        this.executeWaitMsg();
    }

    private dealNotify(output: IUserOutput) {
        if (output && output.syncInfo)
            this.dispatch(NetCMD.SyncInfo, output.syncInfo);
        this.dispatch(output.cmd, output);
        this._socket.input.clear();
    }

    private reconnect() {
        if (!this._socket) return;
        this.state = SocketState.Reconnecting;
        this._socket.connectByUrl(this._url);
    }
}