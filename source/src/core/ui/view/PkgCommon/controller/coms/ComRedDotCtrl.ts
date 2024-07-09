import { GameEvent } from "../../../../../common/GameEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComRedDotMsg, ComRedDotView } from "../../view/coms/ComRedDotView";

export interface ComRedDotData {

}

export class ComRedDotCtrl extends BaseViewCtrl<ComRedDotView, ComRedDotData> {

    override onAdded() {

    }

    override onAwake() {
        this.dispatch(GameEvent.RedDotCompAwake, this);
    }

    override onDestroy() {
        this.dispatch(GameEvent.RedDotCompDestroy, this);
    }
}