import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIBattleMsg, UIBattleView } from "../../view/PkgBattle/UIBattleView";

export interface UIBattleData {

}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData>{

	override onAwake(): void {
		this.addMessageListener(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addMessageListener(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addMessageListener(UIBattleMsg.OnBtnQuitBattleClick, this.onBtnQuitBattleClick);
		this.addMessageListener(UIBattleMsg.OnBtnCloseInfoClick, this.onBtnCloseInfoClick);
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

	}

}