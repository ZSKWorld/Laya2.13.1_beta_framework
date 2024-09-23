import { BattleType } from "../../../../userData/const/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIBattleMsg, UIBattleView } from "../view/UIBattleView";

export interface UIBattleData {
	id: number;
	type: BattleType;
}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData> {
	private _battleCfg: BattleCfgData;
	override onAdded() {
		this.addMessage(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addMessage(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addMessage(UIBattleMsg.OnBtnQuitBattleClick, this.onBtnQuitBattleClick);
	}

	override onEnable() {
		switch (this.data.type) {
			case BattleType.Level: this._battleCfg = cfgMgr.Level[this.data.id]; break;
			case BattleType.Copy: this._battleCfg = cfgMgr.Copy[this.data.id]; break;
			case BattleType.Secret: this._battleCfg = cfgMgr.Secret[this.data.id]; break;
			case BattleType.Boss: this._battleCfg = cfgMgr.Boss[this.data.id]; break;
		}
		this.view.refreshContent(this._battleCfg);
	}

	private onBtnOfflineClick() {

	}

	private onBtnEnemyInfoClick() {

	}

	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
	private onBtnQuitBattleClick() {
		netService.exitBattle({});
	}

}