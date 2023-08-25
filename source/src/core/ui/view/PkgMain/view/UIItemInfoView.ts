import UIItemInfo from "../../../ui/PkgMain/UIItemInfo";
import { ResPath } from "../../../../common/ResPath";

export const enum UIItemInfoMsg {
	OnBtnBgClick = "UIItemInfo_OnBtnBgClick",
	OnBtnShouCangClick = "UIItemInfo_OnBtnShouCangClick",
	OnBtnSellClick = "UIItemInfo_OnBtnSellClick",
	OnBtnUseClick = "UIItemInfo_OnBtnUseClick",
	OnBtnBuyClick = "UIItemInfo_OnBtnBuyClick",
}

export class UIItemInfoView extends ExtensionClass<IView, UIItemInfo>(UIItemInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnBg, BtnShouCang, BtnSell, BtnUse, BtnBuy } = this;
		BtnBg.onClick(this, this.sendMessage, [ UIItemInfoMsg.OnBtnBgClick ]);
		BtnShouCang.onClick(this, this.sendMessage, [ UIItemInfoMsg.OnBtnShouCangClick ]);
		BtnSell.onClick(this, this.sendMessage, [ UIItemInfoMsg.OnBtnSellClick ]);
		BtnUse.onClick(this, this.sendMessage, [ UIItemInfoMsg.OnBtnUseClick ]);
		BtnBuy.onClick(this, this.sendMessage, [ UIItemInfoMsg.OnBtnBuyClick ]);
    }

}
