import { ResPath } from "../../../../common/ResPath";
import UIBattle from "../../../ui/PkgBattle/UIBattle";

export const enum UIBattleMsg {
	OnBtnOfflineClick = "UIBattle_OnBtnOfflineClick",
	OnBtnEnemyInfoClick = "UIBattle_OnBtnEnemyInfoClick",
	OnBtnQuitBattleClick = "UIBattle_OnBtnQuitBattleClick",
}

export class UIBattleView extends ExtensionClass<IView, UIBattle>(UIBattle) {
	static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
		const { btn_offline, btn_enemyInfo, btn_quitBattle } = this;
		btn_offline.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnOfflineClick]);
		btn_enemyInfo.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnEnemyInfoClick]);
		btn_quitBattle.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnQuitBattleClick]);
	}

}
