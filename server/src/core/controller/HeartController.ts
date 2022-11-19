import { TimeUtil } from "../../utils/TimeUtil";
import { BaseController } from "./BaseController";

export class HeartController extends BaseController implements IHeart {
    private _intervalId: NodeJS.Timer;
    heart(data: HeartInput) {
        if (this.connection.logined)
            this.response("heart", { timeStamp: TimeUtil.getTimeStamp() });
    }

    override recover() {
        super.recover();
        clearInterval(this._intervalId);
    }
    protected override onCreate() {
        super.onCreate();
        this._intervalId = setInterval(() => this.heart(null), 10000);
    }
}