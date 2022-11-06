import { TimeUtil } from "../../utils/TimeUtil";
import { BaseController } from "./BaseController";

export class HeartController extends BaseController implements IHeart {
    private _intervalId: NodeJS.Timer;
    override onConstruct() {
        super.onConstruct();
        this._intervalId = setInterval(() => this.heart(null), 10000);
    }
    heart(data: HeartInput) {
        if (this.connection.logined)
            this.response("heart", { timeStamp: TimeUtil.getTimeStamp() });
    }

    override clear() {
        super.clear();
        clearInterval(this._intervalId);
    }
}

export interface HeartInput extends UserInput {

}

export interface HeartOutput extends UserOutput {
    timeStamp: number;
}