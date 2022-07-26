import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass, GetColorStr, GetItemString, GetJingJieString, GetLang } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { ViewExtension } from "../../../core/interfaces";
import ComItemInfo from "../../../ui/PkgMain/ComItemInfo";

export const enum ComItemInfoMsg {
	OnBtnBgClick = "ComItemInfo_OnBtnBgClick",
	OnBtnShouCangClick = "ComItemInfo_OnBtnShouCangClick",
	OnBtnSellClick = "ComItemInfo_OnBtnSellClick",
	OnBtnUseClick = "ComItemInfo_OnBtnUseClick",
	OnBtnBuyClick = "ComItemInfo_OnBtnBuyClick",
	OnNumInput = "ComItemInfo_OnNumInput",
}

export class ComItemInfoView extends ExtensionClass<ViewExtension, ComItemInfo>(ComItemInfo) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnBg, TxtUseNum, BtnShouCang, BtnSell, BtnUse, BtnBuy } = this;
		BtnBg.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnBgClick]);
		BtnShouCang.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnShouCangClick]);
		BtnSell.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnSellClick]);
		BtnUse.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnUseClick]);
		BtnBuy.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnBuyClick]);
		TxtUseNum.on(Laya.Event.INPUT, this, this.sendMessage, [ComItemInfoMsg.OnNumInput]);
	}
	private canUse(id: number) {
		return !!(tableMgr.Props[id] || tableMgr.Food[id] || tableMgr.SkillBook[id] || tableMgr.XinFaBook[id]);
	}
	setContent(id: number, buy: boolean) {
		let type = 0;
		const realID = buy ? tableMgr.Shop[id].SellID : id;
		const { SellRewards, Name, Description, Quality, UseRequire, ItemType } = tableMgr.Item[realID];
		if (buy) type = 2;
		else if (this.canUse(realID)) type = 1;
		this.ctrlUse.selectedIndex = type;
		const canSell = (!buy && SellRewards) ? 1 : 0;
		this.ctrlSell.selectedIndex = canSell ? 1 : 0;
		const sellTxt = buy ? "" : (canSell ? `<br>出售：${GetItemString(SellRewards, true, true)}` : "<br>[color=#FF0000]不可出售[/color]");
		const buyTxt = buy ? `<br>价格：${GetItemString(tableMgr.Shop[id].SellPrice)}` : "";
		this.TxtContent.text = `${GetColorStr(Quality, Name + (buy ? "" : ` x${this.userData.getItemCount(id)}`))}
			<br>境界需求：${UseRequire ? GetJingJieString(UseRequire.jingJie, UseRequire.cengJi) : "无"}
			<br>类别：${GetLang(ItemType || 1110)}
			<br>${Description}` + sellTxt + buyTxt;
		this.BtnShouCang.visible = buy == false;
		this.BtnShouCang.grayed = this.userData.bag.getIsCangPin(id) == false;
	}
	setNumText(text: string | number) {
		this.TxtUseNum.text = String(text);
	}

}
