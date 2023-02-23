import { Pool } from "../../../libs/pool/Pool";
import { Connection } from "../../Connection";
import { ErrorCode } from "../../enum/ErrorCode";

export class BaseController {
    private _cmds: { [ key: string ]: Function };
    private _connection: Connection;
    get connection() {
        return this._connection;
    }
    get user() {
        return this._connection.user;
    }

    static create(connection: Connection) {
        const result = Pool.get(this.prototype.constructor.name as any, this);
        result._connection = connection;
        for (let key in result._cmds) {
            connection.listener.on(key, result, result[ key ]);
        }
        result.onCreate();
        return result;
    }

    recover() {
        this._connection = null;
        Pool.recover(this.constructor.name as any, this);
    }

    protected onCreate() { }

    protected response<T>(cmd: string, data: T = null, error: number = ErrorCode.NONE) {
        if (this.connection) {
            let args: UserOutput = { cmd, error, };
            if (data) Object.assign(args, data);
            this.connection.response(args);
        }
    }

    protected notify(cmd: string, data: string) {
        if (this.connection) {
            let args: UserNotify = { cmd, data };
            this.connection.notify(args);
        }
    }
}

export function AddCMD(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target._cmds = target._cmds || {};
    target._cmds[ propertyKey ] = propertyKey;
}