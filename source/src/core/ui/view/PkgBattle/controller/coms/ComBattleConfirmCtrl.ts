import { BattleType } from "../../../../../net/enum/BattleEnums";
import { BattleService } from "../../../../../net/Services";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComBattleConfirmMsg, ComBattleConfirmView } from "../../view/coms/ComBattleConfirmView";
export interface ComBattleConfirmData {
	type: BattleType;
	data: BattleCfgData;
}

export class ComBattleConfirmCtrl extends BaseViewCtrl<ComBattleConfirmView, ComBattleConfirmData>{

	override onAdded() {
		this.addMessage(ComBattleConfirmMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessage(ComBattleConfirmMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessage(ComBattleConfirmMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessage(ComBattleConfirmMsg.OnBtnBattleClick, this.onBtnBattleClick);
	}

	override onEnable() {
		this.view.refreshContent(this.data.type, this.data.data);
	}

	private onBtnBuyFoodClick() {

	}

	private onBtnBuyTimesClick() {

	}

	private onBtnSaoDangClick() {

	}

	private onBtnBattleClick() {
		const { data, type } = this.data;
		const gatherTime = Math.floor(this.view.slider_num.value * 3600);
		BattleService.Inst.enterBattle({ type: type, id: data.id, gatherTime });
	}

}