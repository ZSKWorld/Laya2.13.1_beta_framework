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

class WebSocket extends Observer {
    private _url: string = "ws://192.168.71.245:8007";
    private _socket: Laya.Socket;
    private _state: SocketState = SocketState.Disconnect;
    private _waitList: IUserInput[];
    private _current: IUserInput;
    get state() { return this._state; }
    private set state(v) {
        const lastState = this._state;
        if (v == lastState) return;
        this._state = v;
        let eventName = "";
        switch (lastState) {
            case SocketState.Disconnect:
                switch (v) {
                    case SocketState.Connecting: eventName = SocketEvent.Connecting; break;
                    case SocketState.Reconnecting: eventName = SocketEvent.Reconnecting; break;
                    case SocketState.Connected: Logger.Error("状态错误 Disconnect => Connected"); break;
                    default: Logger.Error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Connecting:
                switch (v) {
                    case SocketState.Disconnect: eventName = SocketEvent.ConnectFail; break;
                    case SocketState.Reconnecting: Logger.Error("状态错误 Connecting => Reconnecting"); break;
                    case SocketState.Connected: eventName = SocketEvent.ConnectSuccess; break;
                    default: Logger.Error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Reconnecting:
                switch (v) {
                    case SocketState.Disconnect: eventName = SocketEvent.ReconnectFail; break;
                    case SocketState.Connecting: Logger.Error("状态错误 Reconnecting => Connecting"); break;
                    case SocketState.Connected: eventName = SocketEvent.ReconnectSuccess; break;
                    default: Logger.Error("未知的状态", lastState, v); break;
                }
                break;
            case SocketState.Connected:
                switch (v) {
                    case SocketState.Disconnect: eventName = SocketEvent.Close; break;
                    case SocketState.Connecting: Logger.Error("状态错误 Connected => Connecting"); break;
                    case SocketState.Reconnecting: Logger.Error("状态错误 Connected => Reconnecting"); break;
                    default: Logger.Error("未知的状态", lastState, v); break;
                }
                break;
            default: Logger.Error("未知的状态", lastState, v); break;
        }
        eventName && this.dispatch(eventName);
    }
    get connected() { return this.state == SocketState.Connected; }

    init() {
        if (!this._socket) {
            this._waitList = [];
            this._socket = new Laya.Socket();
            this._socket.on(Laya.Event.OPEN, this, this.onOpen);
            this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
            this._socket.on(Laya.Event.CLOSE, this, this.onClose);
            this._socket.connectByUrl(this._url);
            this.state = SocketState.Connecting;
        }
    }

    sendMsg(msg: IUserInput) {
        const { _current, _waitList } = this;
        if (_current && msg.cmd == _current.cmd) return;
        if (_waitList.length && _waitList.find(v => v.cmd == msg.cmd)) return;
        _waitList.push(msg);
        this.executeWaitMsg();
    }

    private onOpen() {
        this.state = SocketState.Connected;
        this.executeWaitMsg();
    }

    private onMessage(message: string): void {
        const output: IUserOutput = JSON.parse(message);
        switch (output.type) {
            case MessageType.Response: this.dealResponse(output); break;
            case MessageType.Notify: this.dealNotify(output); break;
        }
    }

    private onClose() {
        this.state = SocketState.Disconnect;
        this._current = null;
        this._waitList.length = 0;
        Laya.timer.once(1000, this, this.reconnect);
    }

    private executeWaitMsg() {
        if (this.connected && !this._current && this._waitList.length > 0) {
            this._current = this._waitList.shift();
            this._current.token = this._current.token || userData.account.account;
            this._socket.send(JSON.stringify(this._current));
        }
    }

    private dealResponse(output: IUserOutput) {
        const input = this._current;
        let netMsg = `NetCMD_${ output.cmd[0].toUpperCase() + output.cmd.substring(1) }`;
        if (!output.error) {
            if (input && input.cmd != output.cmd) {
                Logger.Error("message error", input, output);
                throw new Error();
            }
            if (output.syncInfo)
                this.dispatch(NetCMD.SyncInfo, output.syncInfo);
        } else {
            this.dispatch(SocketEvent.MsgError, output);
            netMsg += `_Error`;
        }
        this.dispatch(netMsg, [output, input]);
        this._socket.input.clear();
        this._current = null;
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
        this._socket.connectByUrl(this._url);
        this.state = SocketState.Reconnecting;
    }
}

export const websocket = new WebSocket();
windowImmit("websocket", websocket);