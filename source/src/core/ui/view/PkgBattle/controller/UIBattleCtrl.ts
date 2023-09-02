import { BattleType } from "../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UIBattleMsg, UIBattleView } from "../view/UIBattleView";

export interface UIBattleData {

}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData>{

    override onAdded() {
		this.addMessage(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addMessage(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addMessage(UIBattleMsg.OnBtnQuitBattleClick, this.onBtnQuitBattleClick);
	}

	override onEnable() {
		
	}

	private onBtnOfflineClick() {

	}

	private onBtnEnemyInfoClick() {

	}

	@CtrlKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
	private onBtnQuitBattleClick() {
		this.showView(ViewID.UIChooseBattleView);
		this.removeSelf();
	}

}