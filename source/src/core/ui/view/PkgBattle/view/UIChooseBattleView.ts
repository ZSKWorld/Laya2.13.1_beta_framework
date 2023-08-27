import { GameUtil } from "../../../../common/GameUtil";
import { ResPath } from "../../../../common/ResPath";
import UIChooseBattle from "../../../ui/PkgBattle/UIChooseBattle";

export const enum UIChooseBattleMsg {
	OnGraphConfirmBg = "UIChooseBattle_OnGraphConfirmBg",
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
	OnBtnBuyFoodClick = "UIChooseBattle_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "UIChooseBattle_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "UIChooseBattle_OnBtnSaoDangClick",
	OnBtnBattleClick = "UIChooseBattle_OnBtnBattleClick",
}

export class UIChooseBattleView extends ExtensionClass<IView, UIChooseBattle>(UIChooseBattle) {
	static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
		const { graph_confirmBg,btn_back, btn_buyFood, btn_buyTimes, btn_saoDang, btn_battle } = this;
		graph_confirmBg.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnGraphConfirmBg ]);
		btn_back.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBackClick ]);
		btn_buyFood.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyFoodClick ]);
		btn_buyTimes.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyTimesClick ]);
		btn_saoDang.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnSaoDangClick ]);
		btn_battle.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBattleClick ]);
	}

	showConfirm(show: boolean, data?: BattleLevel) {
		this.ctrl_confirm.selectedIndex = show ? 1 : 0;
		if (show && data) {
			this.txt_title.text = data.name + "Lv." + data.enemyLevel;
			let dropStr = GameUtil.GetItemString(data.randomDrapOut ? data.baseDrapOut.concat(data.randomDrapOut) : data.baseDrapOut, false);
			this.txt_content.text = `消耗：${ data.vigorCost }精力<br>掉落：${ dropStr }${ data.desc }`;
		}
	}

	setBattleType(type: number) {
		this.ctrl_openType.selectedIndex = type;
	}

}
