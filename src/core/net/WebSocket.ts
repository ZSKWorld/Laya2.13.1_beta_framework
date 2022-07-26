
class WebSocket {
    private _socket: Laya.Socket;
    constructor() {
    }
    init() {
        this._socket = new Laya.Socket();
        this._socket.protocols = ["echo-protocol"];
        this._socket.connectByUrl("ws://localhost:3000?id=123&name='zsk'");

        this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this._socket.on(Laya.Event.ERROR, this, this.onConnectError);
        this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
    }

    private onSocketOpen() {
        console.log("socket opened");
    }
    private onMessageReveived(message: any) {
        console.log("message", message);
    }
    private onConnectError(e) {
        console.log("socket error", e);
    }
    private onSocketClose(e) {
        console.log("socket closed", e);
    }

    sendMsg(msg: string) {
        this._socket.send(msg);
    }
}
export const websocket = new WebSocket();