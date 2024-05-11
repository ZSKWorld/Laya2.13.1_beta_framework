import { Connection } from "../../Connection";
import { ErrorCode } from "../../enum/ErrorCode";
import { MessageType } from "../../enum/MessageType";
import { Controller } from "../Controller";

export class CMDController extends Controller {
    private _cmds: { [key: string]: Function };

    static override create<T>(connection: Connection) {
        const result = super.create(connection) as CMDController;
        for (let key in result._cmds) {
            connection.listener.on(key, result, result[key]);
        }
        return result as T;
    }

    protected response<T>(cmd: string, data?: T, error: number = ErrorCode.NONE) {
        if (this.connection) {
            let args: IUserOutput = { cmd, error };
            if (data) Object.assign(args, data);
            this.connection.sendMessage(MessageType.Response, args);
        }
    }
}

export function CMD(_: any, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
        const _this = this as any;
        _this._cmds = _this._cmds || {};
        _this._cmds[context.name] = context.name;
    });
}