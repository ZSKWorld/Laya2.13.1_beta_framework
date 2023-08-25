import UIChooseBattle from "../../../ui/PkgBattle/UIChooseBattle";
import { ResPath } from "../../../../common/ResPath";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
	OnBtnBuyFoodClick = "UIChooseBattle_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "UIChooseBattle_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "UIChooseBattle_OnBtnSaoDangClick",
	OnBtnBattleClick = "UIChooseBattle_OnBtnBattleClick",
}

export class UIChooseBattleView extends ExtensionClass<IView, UIChooseBattle>(UIChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
        const { BtnBack, btn_buyFood, btn_buyTimes, btn_saoDang, btn_battle } = this;
		BtnBack.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBackClick ]);
		btn_buyFood.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyFoodClick ]);
		btn_buyTimes.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyTimesClick ]);
		btn_saoDang.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnSaoDangClick ]);
		btn_battle.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBattleClick ]);
    }

}
