import { TimeUtil } from "../../../../utils/TimeUtil";
import { NotifyType } from "../../../enum/NotifyType";
import { NotifyController } from "../NotifyController";

export class NotifyHeart extends NotifyController {
    private _delta: number = 0;

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 10000) {
            this._delta = 0;
            if (this.connection.logined) {
                this.notify<INotifyHeart>(NotifyType.Heart, { timeStamp: TimeUtil.getTimeStamp() });
            }
        }
    }
}