import { TimeUtil } from "../../../utils/TimeUtil";
import { NotifyType } from "../../enum/NotifyType";
import { Controller } from "../Controller";

export class HeartController extends Controller implements IHeartCtrl {
    private _delta: number = 0;

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 10000) {
            this._delta = 0;
            if (this.connection.logined) {
                this.notify<HeartNotify>(NotifyType.Heart, { timeStamp: TimeUtil.getTimeStamp() });
            }
        }
    }
}