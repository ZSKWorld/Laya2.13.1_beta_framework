import { BattleType } from "../../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { RenderChooseBattleMsg, RenderChooseBattleView } from "../../view/renders/RenderChooseBattleView";

export class RenderChooseBattleCtrl extends BaseViewCtrl<RenderChooseBattleView, BattleType>{
	cfgData: BattleLevel;

    override onAdded() {
		this.addMessage(RenderChooseBattleMsg.OnBtnBreakClick, this.onBtnBreakClick);
	}

	override onUpdate() {
		if (this.cfgData && this.data == BattleType.Boss) {
			this.view.refreshBossCool(this.cfgData as CfgBossData);
		}
	}

	override onDisable() {
		this.cfgData = null;
	}

	private onBtnBreakClick() {

	}

}