import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIChooseBattleMsg, UIChooseBattleView } from "../view/UIChooseBattleView";

export interface UIChooseBattleData {

}

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, UIChooseBattleData>{

    override onAdded() {
		this.addMessage(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UIChooseBattleMsg.OnBtnConfirmBgClick, this.onBtnConfirmBgClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessage(UIChooseBattleMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBattleClick, this.onBtnBattleClick);
    }

	private onBtnBackClick() {
	
	}

	private onBtnConfirmBgClick() {
	
	}

	private onBtnBuyFoodClick() {
	
	}

	private onBtnBuyTimesClick() {
	
	}

	private onBtnSaoDangClick() {
	
	}

	private onBtnBattleClick() {
	
	}

}