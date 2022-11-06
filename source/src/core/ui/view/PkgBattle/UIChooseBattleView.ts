import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIChooseBattle from "../../ui/PkgBattle/UIChooseBattle";
import { ResPath } from "../../../common/ResPath";
import { GameUtil } from "../../../common/GameUtil";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
	OnBtnConfirmBgClick = "UIChooseBattle_OnBtnConfirmBgClick",
	OnBtnBuyFoodClick = "UIChooseBattle_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "UIChooseBattle_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "UIChooseBattle_OnBtnSaoDangClick",
	OnBtnBattleClick = "UIChooseBattle_OnBtnBattleClick",
}

export class UIChooseBattleView extends ExtensionClass<ViewExtension, UIChooseBattle>(UIChooseBattle) {
    static readonly PkgRes = ResPath.UIPath.PkgBattle;

	override onCreate(): void {
        const { BtnBack, BtnConfirmBg, BtnBuyFood, BtnBuyTimes, BtnSaoDang, BtnBattle } = this;
	    BtnBack.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBackClick ]);
	    BtnConfirmBg.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnConfirmBgClick ]);
	    BtnBuyFood.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyFoodClick ]);
	    BtnBuyTimes.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyTimesClick ]);
	    BtnSaoDang.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnSaoDangClick ]);
	    BtnBattle.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBattleClick ]);
    }

	showConfirm(show: boolean, data?: BattleLevel) {
		this.ctrlConfirm.selectedIndex = show ? 1 : 0;
		if ( show && data ) {
			this.TxtTitle.text = data.Name + "Lv." + data.EnemyLevel;
			let dropStr = GameUtil.getItemString(data.RandomDropOut ? data.BaseDropOut.concat(data.RandomDropOut) : data.BaseDropOut, false);
			this.TxtContent.text = `消耗：${ data.VigorCost }精力<br>掉落：${ dropStr }${ data.Description }`;
		}
	}

	setBattleType(type: number) {
		this.ctrlOpenType.selectedIndex = type;
	}

}
