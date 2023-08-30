import { TimeUtil } from "../../../utils/TimeUtil";
import { Controller } from "../Controller";

export class HeartController extends Controller implements IHeartCtrl {
    private _delta: number = 0;
    heart(data: HeartInput) {
    }

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 10000) {
            this._delta = 0;
            if (this.connection.logined)
                this.response("heart", { timeStamp: TimeUtil.getTimeStamp() });
        }
    }
}