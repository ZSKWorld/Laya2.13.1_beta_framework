import UIGoodsInfo from "../../../ui/PkgMain/UIGoodsInfo";
import { ResPath } from "../../../../common/ResPath";
import { UserUtil } from "../../../../userData/UserUtil";
import { GameUtil } from "../../../../common/GameUtil";

export const enum UIGoodsInfoMsg {
	OnBtnCollectClick = "UIGoodsInfo_OnBtnCollectClick",
	OnBtnSellClick = "UIGoodsInfo_OnBtnSellClick",
	OnBtnUseClick = "UIGoodsInfo_OnBtnUseClick",
	OnBtnBuyClick = "UIGoodsInfo_OnBtnBuyClick",
	OnNumInput = "UIGoodsInfo_OnNumInput",
}

export class UIGoodsInfoView extends ExtensionClass<IView, UIGoodsInfo>(UIGoodsInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { graph_bg, btn_collect, btn_sell, btn_use, btn_buy, txt_userNum } = this;
		graph_bg.onClick(this, this.removeSelf);
		btn_collect.onClick(this, this.sendMessage, [ UIGoodsInfoMsg.OnBtnCollectClick ]);
		btn_sell.onClick(this, this.sendMessage, [ UIGoodsInfoMsg.OnBtnSellClick ]);
		btn_use.onClick(this, this.sendMessage, [ UIGoodsInfoMsg.OnBtnUseClick ]);
		btn_buy.onClick(this, this.sendMessage, [ UIGoodsInfoMsg.OnBtnBuyClick ]);
		txt_userNum.on(Laya.Event.INPUT, this, this.sendMessage, [ UIGoodsInfoMsg.OnNumInput ]);
    }

	setContent(id: number, buy: boolean) {
		let type = 0;
		const realID = buy ? cfgMgr.Shop[ id ].sellID : id;
		const { sellRewards, name, desc, quality, useRequire, itemType } = cfgMgr.Item[ realID ];
		if (buy) type = 2;
		else if (UserUtil.CanUseItem(realID)) type = 1;
		this.ctrlUse.selectedIndex = type;
		const canSell = (!buy && sellRewards) ? 1 : 0;
		this.ctrlSell.selectedIndex = canSell ? 1 : 0;
		const sellTxt = buy ? "" : (canSell ? `<br>出售：${ GameUtil.GetItemString(sellRewards, true, true) }` : "<br>[color=#FF0000]不可出售[/color]");
		const buyTxt = buy ? `<br>价格：${ GameUtil.GetItemString(cfgMgr.Shop[ id ].sellPrice) }` : "";
		this.txt_content.text = `${ GameUtil.GetColorStr(quality, name + (buy ? "" : ` x${ userData.bag.getItemCount(id) }`)) }
			<br>境界需求：${ useRequire ? UserUtil.GetJingJieStr(useRequire.jingJie, useRequire.cengJi) : "无" }
			<br>类别：${ cfgMgr.Lang[itemType || 1110].text }
			<br>${ desc }` + sellTxt + buyTxt;
		this.btn_collect.visible = buy == false;
		this.btn_collect.grayed = !userData.bag.isCollect(id);
	}

	setNumText(text: string | number) {
		this.txt_userNum.text = String(text);
	}

}
