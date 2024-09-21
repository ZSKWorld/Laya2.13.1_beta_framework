import { GameUtil } from "../../../../common/GameUtil";
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

	refreshContent(data: BattleCfgData) {
		const { txt_info } = this;
		const dropStr = GameUtil.GetItemString(data.randomDrapOut ? data.baseDrapOut.concat(data.randomDrapOut) : data.baseDrapOut, false);
		txt_info.text = `消耗：${ data.vigorCost }精力<br/>掉落：${ dropStr }${ data.desc }`;
	}

}
