import { GameUtil } from "../../../../../common/GameUtil";
import { UserUtil } from "../../../../../userData/UserUtil";
import ComGoodsInfo from "../../../../ui/PkgMain/ComGoodsInfo";

export const enum ComGoodsInfoMsg {
	OnBtnCollectClick = "ComGoodsInfo_OnBtnCollectClick",
	OnBtnUseClick = "ComGoodsInfo_OnBtnUseClick",
	OnBtnSellClick = "ComGoodsInfo_OnBtnSellClick",
	OnBtnBuyClick = "ComGoodsInfo_OnBtnBuyClick",
	OnNumInput = "ComGoodsInfo_OnNumInput",
}

export class ComGoodsInfoView extends ExtensionClass<IView, ComGoodsInfo>(ComGoodsInfo) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_collect, btn_use, btn_sell, btn_buy, input_num } = this;
		btn_collect.onClick(this, this.sendMessage, [ComGoodsInfoMsg.OnBtnCollectClick]);
		btn_use.onClick(this, this.sendMessage, [ComGoodsInfoMsg.OnBtnUseClick]);
		btn_sell.onClick(this, this.sendMessage, [ComGoodsInfoMsg.OnBtnSellClick]);
		btn_buy.onClick(this, this.sendMessage, [ComGoodsInfoMsg.OnBtnBuyClick]);
		input_num.on(Laya.Event.INPUT, this, this.sendMessage, [ComGoodsInfoMsg.OnNumInput]);
	}

	setContent(id: number, buy: boolean) {
		const realID = buy ? cfgMgr.Shop[id].sellID : id;
		const { sellRewards, name, desc, quality, useRequire, itemType, salable } = cfgMgr.Item[realID];
		const canSell = !buy && !!salable;
		this.ctrlState.selectedIndex = buy ? 3 : (canSell ? 2 : 1);
		const sellTxt = buy ? "" : (canSell ? `<br/>出售：${ GameUtil.getItemString(sellRewards, true, true) }` : "<br/>[color=#FF0000]不可出售[/color]");
		const buyTxt = buy ? `<br/>价格：${ GameUtil.getItemString(cfgMgr.Shop[id].sellPrice) }` : "";
		const haveTxt = buy ? `<br/>拥有：${ userData.bag.getItemCount(realID) }` : "";
		this.txt_content.text = `${ GameUtil.getColorStr(quality, name + (buy ? "" : ` x${ userData.bag.getItemCount(id) }`)) }
			<br/>类别：${ cfgMgr.Lang[itemType || 1110].text }`
			+ buyTxt + haveTxt
			+ `<br/>境界需求：${ useRequire ? UserUtil.getJingJieStr(useRequire.jingJie, useRequire.cengJi) : "无" }`
			+ sellTxt
			+ `<br/>${ desc }`;
		this.btn_collect.visible = buy == false;
		this.btn_collect.grayed = !userData.bag.isCollect(id);
	}

	setNumText(text: string | number) {
		this.input_num.text = String(text);
	}

}
