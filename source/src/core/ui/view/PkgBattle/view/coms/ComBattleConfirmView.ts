import { GameUtil } from "../../../../../common/GameUtil";
import { BattleType } from "../../../../../userData/const/BattleEnums";
import ComBattleConfirm from "../../../../ui/PkgBattle/ComBattleConfirm";

export const enum ComBattleConfirmMsg {
	OnBtnBuyFoodClick = "ComBattleConfirm_OnBtnBuyFoodClick",
	OnBtnBuyTimesClick = "ComBattleConfirm_OnBtnBuyTimesClick",
	OnBtnSaoDangClick = "ComBattleConfirm_OnBtnSaoDangClick",
	OnBtnBattleClick = "ComBattleConfirm_OnBtnBattleClick",
}

export class ComBattleConfirmView extends ExtensionClass<IView, ComBattleConfirm>(ComBattleConfirm) {
	static readonly pkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
		const { btn_buyFood, btn_buyTimes, btn_saoDang, btn_battle } = this;
		btn_buyFood.onClick(this, this.sendMessage, [ComBattleConfirmMsg.OnBtnBuyFoodClick]);
		btn_buyTimes.onClick(this, this.sendMessage, [ComBattleConfirmMsg.OnBtnBuyTimesClick]);
		btn_saoDang.onClick(this, this.sendMessage, [ComBattleConfirmMsg.OnBtnSaoDangClick]);
		btn_battle.onClick(this, this.sendMessage, [ComBattleConfirmMsg.OnBtnBattleClick]);
	}

	refreshContent(type: BattleType, data: BattleCfgData) {
		const { txt_title, txt_content, ctrl_openType } = this;
		ctrl_openType.selectedIndex = type - 1;
		if (type == BattleType.Gather) {
			txt_title.text = "你要采集多久呢？(小时)";
			txt_content.text = `1<br/>1<br/>1<br/>1<br/>1<br/>`;
		}
		else {
			txt_title.text = data.name + "Lv." + data.enemyLevel;
			const dropStr = GameUtil.getItemString(data.randomDrapOut ? data.baseDrapOut.concat(data.randomDrapOut) : data.baseDrapOut, false);
			txt_content.text = `消耗：${ data.vigorCost }精力<br/>掉落：${ dropStr }${ data.desc }`;
		}
	}

}
