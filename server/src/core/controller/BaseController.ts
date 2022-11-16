import { Connection } from "../Connection";
import { ErrorCode } from "../enum/ErrorCode";

export class BaseController {
    private _cmds: { [ key: string ]: Function };
    protected connection: Connection;
    constructor(connection: Connection) {
        this.connection = connection;
        this.connection.registerEvent(this._cmds, this);
        this.onConstruct();
    }

    onConstruct() { }

    clear() {
        this._cmds = null;
        this.connection = null;
    }

    protected response<T>(cmd: string, data: T = null, error: number = ErrorCode.NONE) {
        if (this.connection) {
            let args: UserOutput = {
                cmd,
                error,
            };
            if (data) Object.assign(args, data);
            this.connection.response(args);
        }
    }
}

export function AddCMD(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target._cmds = target._cmds || {};
    target._cmds[ propertyKey ] = propertyKey;
}