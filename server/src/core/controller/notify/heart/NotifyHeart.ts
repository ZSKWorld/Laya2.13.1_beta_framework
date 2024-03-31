import { TimeUtil } from "../../../../utils/TimeUtil";
import { NetNotify } from "../../../enum/NetNotify";
import { NotifyController } from "../NotifyController";

export class NotifyHeart extends NotifyController {
    private _delta: number = 0;

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 10000) {
            this._delta = 0;
            if (this.connection.logined) {
                this.notify<INotifyHeart>(NetNotify.NotifyHeart, { timeStamp: TimeUtil.getTimeStamp() });
            }
        }
    }
}