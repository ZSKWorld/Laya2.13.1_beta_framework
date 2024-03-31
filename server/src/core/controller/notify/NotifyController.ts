import { MessageType } from "../../enum/MessageType";
import { Controller } from "../Controller";

export class NotifyController extends Controller {

    protected notify<T>(cmd: string, data?: T) {
        if (this.connection) {
            let args: IUserOutput = { cmd };
            if (data) Object.assign(args, data);
            this.connection.sendMessage(MessageType.Notify, args);
        }
    }
}