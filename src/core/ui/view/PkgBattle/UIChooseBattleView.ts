import { ResPath } from "../../../common/ResPath";
import { ExtensionClass, GetItemString } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UIChooseBattle from "../../ui/PkgBattle/UIChooseBattle";
import { BattleLevel } from "../../viewCtrl/PkgBattle/UIChooseBattleCtrl";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
	OnBtnConfirmBgClick = "UIChooseBattle_OnBtnConfirmBgClick",
	OnBtnBuyFoodClick = "UIChooseBattle_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "UIChooseBattle_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "UIChooseBattle_OnBtnSaoDangClick",
	OnBtnBattleClick = "UIChooseBattle_OnBtnBattleClick",
}

export class UIChooseBattleView extends ExtensionClass<ViewExtension, UIChooseBattle>(UIChooseBattle) {
	static PkgRes = ResPath.Ui_PkgBattle;

	onCreate(): void {
		const { BtnBack, BtnConfirmBg, BtnBuyFood, BtnSaoDang, BtnBattle } = this;
		BtnBack.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBackClick ]);
		BtnConfirmBg.onClick(this, this.showConfirm, [ false ]);
		BtnBuyFood.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBuyFoodClick ]);
		BtnSaoDang.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnSaoDangClick ]);
		BtnBattle.onClick(this, this.sendMessage, [ UIChooseBattleMsg.OnBtnBattleClick ]);
	}

	showConfirm(show: boolean, data?: BattleLevel) {
		this.ctrlConfirm.selectedIndex = show ? 1 : 0;
		if ( show && data ) {
			this.TxtTitle.text = data.Name + "Lv." + data.EnemyLevel;
			let dropStr = GetItemString(data.RandomDropOut ? data.BaseDropOut.concat(data.RandomDropOut) : data.BaseDropOut, false);
			this.TxtContent.text = `消耗：${ data.VigorCost }精力<br>掉落：${ dropStr }${ data.Description }`;
		}
	}

	setBattleType(type: number) {
		this.ctrlOpenType.selectedIndex = type;
	}

}
