import { Observer } from "../libs/event/Observer";
type Resolve = (value: any) => void;
class WebSocket extends Observer {
    private url: string = "ws://localhost:3000?id=123&name=zsk";
    private socket: Laya.Socket;
    private waitList: [ any, Resolve ][];
    private current: any;
    private currCb: (value: any) => void;
    public get connected(): boolean {
        return this.socket.connected;
    }

    public init(): void {
        this.socket = new Laya.Socket();
        this.socket.protocols = [ "echo-protocol" ];
        this.socket.connectByUrl(this.url);

        this.waitList = [];

        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
        this.socket.on(Laya.Event.ERROR, this, this.onSocketError);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
    }

    public sendMsg(msg: any): Promise<any> {
        if (!this.socket) return;
        if (this.current && msg.cmd == this.current.cmd) {
            return;
        }
        if (this.waitList.length > 0) {
            for (let i = 0; i < this.waitList.length; i++) {
                if (this.waitList[ i ][ 0 ].cmd == msg.cmd) {
                    return;
                }
            }
        }

        return new Promise((resolve) => {
            if (msg.cmd == "reconect") {
                this.waitList.unshift([ msg, resolve ]);
            } else {
                this.waitList.push([ msg, resolve ]);
            }
            this.executeWaitMsg();
        });
    }

    private onSocketOpen(): void {
        console.log("socket open");
        this.executeWaitMsg();
    }

    private onSocketMessage(message: any): void {
        const msg = JSON.parse(message);
        if (msg && !msg.error) {
            if (this.current && this.current.cmd == msg.cmd) {
                this.currCb(msg);
                this.current = null;
                this.currCb = null;
            }
        } else {
            this.currCb?.(msg);
            this.current = null;
            this.currCb = null;
        }

        this.socket.input.clear();
        this.executeWaitMsg();
    }

    private onSocketError(e): void {
        console.log("socket error");
        // this.onSocketClose();
    }

    private onSocketClose(): void {
        console.log("socket close");
        this.socket.connectByUrl(this.url);
        console.log("socket reconnectting...");
    }

    private executeWaitMsg(): void {
        if (this.waitList.length > 0 && !this.current && this.connected) {
            const [ msg, callback ] = this.waitList.shift();
            this.current = msg;
            this.currCb = callback;
            this.socket.send(JSON.stringify(this.current));
        }
    }
}

export const websocket = new WebSocket();