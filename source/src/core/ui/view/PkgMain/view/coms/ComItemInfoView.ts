import ComItemInfo from "../../../../ui/PkgMain/ComItemInfo";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComItemInfoMsg {
	OnBtnBgClick = "ComItemInfo_OnBtnBgClick",
	OnBtnShouCangClick = "ComItemInfo_OnBtnShouCangClick",
	OnBtnSellClick = "ComItemInfo_OnBtnSellClick",
	OnBtnUseClick = "ComItemInfo_OnBtnUseClick",
	OnBtnBuyClick = "ComItemInfo_OnBtnBuyClick",
}

export class ComItemInfoView extends ExtensionClass<IView, ComItemInfo>(ComItemInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnBg, BtnShouCang, BtnSell, BtnUse, BtnBuy } = this;
		BtnBg.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnBgClick ]);
		BtnShouCang.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnShouCangClick ]);
		BtnSell.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnSellClick ]);
		BtnUse.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnUseClick ]);
		BtnBuy.onClick(this, this.sendMessage, [ ComItemInfoMsg.OnBtnBuyClick ]);
    }

}
