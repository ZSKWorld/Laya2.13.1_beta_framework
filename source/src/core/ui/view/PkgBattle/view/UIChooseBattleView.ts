import UIChooseBattle from "../../../ui/PkgBattle/UIChooseBattle";
import { ResPath } from "../../../../common/ResPath";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
	OnBtnConfirmBgClick = "UIChooseBattle_OnBtnConfirmBgClick",
	OnBtnBuyFoodClick = "UIChooseBattle_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "UIChooseBattle_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "UIChooseBattle_OnBtnSaoDangClick",
	OnBtnBattleClick = "UIChooseBattle_OnBtnBattleClick",
}

export class UIChooseBattleView extends ExtensionClass<IView, UIChooseBattle>(UIChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
        const { BtnBack, BtnConfirmBg, BtnBuyFood, BtnBuyTimes, BtnSaoDang, BtnBattle } = this;
		BtnBack.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBackClick ]);
		BtnConfirmBg.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnConfirmBgClick ]);
		BtnBuyFood.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyFoodClick ]);
		BtnBuyTimes.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyTimesClick ]);
		BtnSaoDang.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnSaoDangClick ]);
		BtnBattle.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBattleClick ]);
    }

}
