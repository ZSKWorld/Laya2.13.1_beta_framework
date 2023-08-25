import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIBattleMsg, UIBattleView } from "../view/UIBattleView";

export interface UIBattleData {

}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData>{

    override onAdded() {
		this.addMessage(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addMessage(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addMessage(UIBattleMsg.OnBtnQuitBattleClick, this.onBtnQuitBattleClick);
    }

	private onBtnOfflineClick() {
	
	}

	private onBtnEnemyInfoClick() {
	
	}

	private onBtnQuitBattleClick() {
	
	}

}