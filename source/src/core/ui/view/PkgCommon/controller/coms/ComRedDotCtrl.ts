import { GameEvent } from "../../../../../common/GameEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComRedDotView } from "../../view/coms/ComRedDotView";

export interface ComRedDotData {

}

export class ComRedDotCtrl extends BaseViewCtrl<ComRedDotView, ComRedDotData> {

    override onAwake() {
        this.dispatch(GameEvent.RedDotCompAwake, this.view);
    }

    override onEnable() {
        this.view.trans_anim.play(null, -1);
    }

    override onDisable() {
        this.view.trans_anim.stop(false);
    }

    override onDestroy() {
        this.dispatch(GameEvent.RedDotCompDestroy, this.view);
    }
}