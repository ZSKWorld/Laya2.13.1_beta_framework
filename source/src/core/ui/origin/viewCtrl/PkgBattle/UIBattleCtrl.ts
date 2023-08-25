import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIBattleMsg, UIBattleView } from "../../view/PkgBattle/UIBattleView";

export interface UIBattleData {

}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData>{

	override onAwake(): void {
		this.addMessage(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addMessage(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addMessage(UIBattleMsg.OnBtnQuitBattleClick, this.onBtnQuitBattleClick);
		this.addMessage(UIBattleMsg.OnBtnCloseInfoClick, this.onBtnCloseInfoClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnOfflineClick(): void {

	}

	private onBtnEnemyInfoClick(): void {

	}

	private onBtnQuitBattleClick(): void {
		this.removeSelf();
	}

	private onBtnCloseInfoClick(): void {
		this.view.setInfoVisible(false);
	}

}