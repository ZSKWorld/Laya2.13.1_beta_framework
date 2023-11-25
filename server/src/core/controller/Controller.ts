import { Pool } from "../../libs/pool/Pool";
import { Connection } from "../Connection";
import { ErrorCode } from "../enum/ErrorCode";
import { MessageType } from "../enum/MessageType";

export class Controller {
    private _cmds: { [ key: string ]: Function };
    private _connection: Connection;
    get connection() { return this._connection; }
    get user() { return this._connection.user; }

    static create(connection: Connection) {
        const result = Pool.get(this.prototype.constructor.name as any, this);
        result._connection = connection;
        for (let key in result._cmds) {
            connection.listener.on(key, result, result[ key ]);
        }
        result.onCreate();
        return result;
    }

    update(delta: number) {

    }

    close() {

    }

    recover() {
        this._connection = null;
        Pool.recover(this.constructor.name as any, this);
    }

    protected onCreate() { }

    protected response<T>(cmd: string, data?: T, error: number = ErrorCode.NONE) {
        if (this.connection) {
            let args: UserOutput = { cmd, error };
            if (data) Object.assign(args, data);
            this.connection.sendMessage(MessageType.Response, args);
        }
    }

    protected notify<T>(cmd: string, data?: T) {
        if (this.connection) {
            let args: UserNotify = { cmd };
            if (data) Object.assign(args, data);
            this.connection.sendMessage(MessageType.Notify, args);
        }
    }
}

export function AddCMD(_: any, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
        const _this = this as any;
        _this._cmds = _this._cmds || {};
        _this._cmds[ context.name ] = context.name;
    });
}