import { GameUtil } from "../../../../common/GameUtil";
import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { ViewExtension } from "../../../core/Interfaces";
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
	static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
		const { BtnBg, BtnShouCang, BtnSell, BtnUse, BtnBuy, TxtUseNum } = this;
		BtnBg.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnBgClick ]);
		BtnShouCang.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnShouCangClick ]);
		BtnSell.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnSellClick ]);
		BtnUse.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnUseClick ]);
		BtnBuy.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnBuyClick ]);
		TxtUseNum.on(Laya.Event.INPUT, this, this.sendMessage, [ ComItemInfoMsg.OnNumInput ]);
	}

	setContent(id: number, buy: boolean) {
		let type = 0;
		const realID = buy ? tableMgr.Shop[ id ].SellID : id;
		const { SellRewards, Name, Description, Quality, UseRequire, ItemType } = tableMgr.Item[ realID ];
		if (buy) type = 2;
		else if (GameUtil.CanUseItem(realID)) type = 1;
		this.ctrlUse.selectedIndex = type;
		const canSell = (!buy && SellRewards) ? 1 : 0;
		this.ctrlSell.selectedIndex = canSell ? 1 : 0;
		const sellTxt = buy ? "" : (canSell ? `<br>出售：${ GameUtil.GetItemString(SellRewards, true, true) }` : "<br>[color=#FF0000]不可出售[/color]");
		const buyTxt = buy ? `<br>价格：${ GameUtil.GetItemString(tableMgr.Shop[ id ].SellPrice) }` : "";
		this.TxtContent.text = `${ GameUtil.GetColorStr(Quality, Name + (buy ? "" : ` x${ this.userData.getItemCount(id) }`)) }
			<br>境界需求：${ UseRequire ? GameUtil.GetJingJieStr(UseRequire.jingJie, UseRequire.cengJi) : "无" }
			<br>类别：${ GameUtil.GetLang(ItemType || 1110) }
			<br>${ Description }` + sellTxt + buyTxt;
		this.BtnShouCang.visible = buy == false;
		this.BtnShouCang.grayed = !this.userData.isCollect(id);
	}

	setNumText(text: string | number) {
		this.TxtUseNum.text = String(text);
	}

}
