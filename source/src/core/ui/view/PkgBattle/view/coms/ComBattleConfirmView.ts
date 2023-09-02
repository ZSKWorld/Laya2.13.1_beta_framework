import ComBattleConfirm from "../../../../ui/PkgBattle/ComBattleConfirm";
import { ResPath } from "../../../../../common/ResPath";
import { GameUtil } from "../../../../../common/GameUtil";

export const enum ComBattleConfirmMsg {
	OnBtnBuyFoodClick = "ComBattleConfirm_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "ComBattleConfirm_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "ComBattleConfirm_OnBtnSaoDangClick",
	OnBtnBattleClick = "ComBattleConfirm_OnBtnBattleClick",
}

export class ComBattleConfirmView extends ExtensionClass<IView, ComBattleConfirm>(ComBattleConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
        const { btn_buyFood, btn_buyTimes, btn_saoDang, btn_battle } = this;
		btn_buyFood.onClick(this, this.sendMessage, [ ComBattleConfirmMsg.OnBtnBuyFoodClick ]);
		btn_buyTimes.onClick(this, this.sendMessage, [ ComBattleConfirmMsg.OnBtnBuyTimesClick ]);
		btn_saoDang.onClick(this, this.sendMessage, [ ComBattleConfirmMsg.OnBtnSaoDangClick ]);
		btn_battle.onClick(this, this.sendMessage, [ ComBattleConfirmMsg.OnBtnBattleClick ]);
    }

	refreshContent(data: BattleLevel) {
		this.txt_title.text = data.name + "Lv." + data.enemyLevel;
		let dropStr = GameUtil.GetItemString(data.randomDrapOut ? data.baseDrapOut.concat(data.randomDrapOut) : data.baseDrapOut, false);
		this.txt_content.text = `消耗：${ data.vigorCost }精力<br>掉落：${ dropStr }${ data.desc }`;
	}

}
