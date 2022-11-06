import { Connection } from "../Connection";
import { ErrorCode } from "../ErrorCode";

export class BaseController {
    private _cmds: { [ key: string ]: Function };
    protected connection: Connection;
    constructor(connection: Connection) {
        this.connection = connection;
        if (this._cmds) {
            for (let key in this._cmds) {
                this.connection.listener.on(key, this, this[ key ]);
            }
        }
        this.onConstruct();
    }

    onConstruct() { }

    clear() {
        this._cmds = null;
        this.connection = null;
    }

    protected response(cmd: string, data?: object, error: number = ErrorCode.NONE) {
        if (this.connection) {
            let args = {
                cmd,
                error,
            };
            if (data) args = Object.assign(args, data);
            this.connection.response(args);
        }
    }
}

export function AddCMD(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target._cmds = target._cmds || {};
    target._cmds[ propertyKey ] = propertyKey;
}