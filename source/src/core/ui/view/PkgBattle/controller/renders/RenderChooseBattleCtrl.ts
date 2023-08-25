import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { RenderChooseBattleMsg, RenderChooseBattleView } from "../../view/renders/RenderChooseBattleView";

export interface RenderChooseBattleData {

}

export class RenderChooseBattleCtrl extends BaseViewCtrl<RenderChooseBattleView, RenderChooseBattleData>{

    override onAdded() {
		this.addMessage(RenderChooseBattleMsg.OnBtnBreakClick, this.onBtnBreakClick);
    }

	private onBtnBreakClick() {
	
	}

}