import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIPlayerInfo from "../../ui/PkgMain/UIPlayerInfo";
import { ResPath } from "../../../common/ResPath";

export const enum UIPlayerInfoMsg {
	OnBtnExplainClick = "UIPlayerInfo_OnBtnExplainClick",
	OnBtnBackClick = "UIPlayerInfo_OnBtnBackClick",
	OnBtnCopyIDClick = "UIPlayerInfo_OnBtnCopyIDClick",
	OnBtnGiftClick = "UIPlayerInfo_OnBtnGiftClick",
}

export class UIPlayerInfoView extends ExtensionClass<ViewExtension, UIPlayerInfo>(UIPlayerInfo) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnExplain, BtnBack, BtnCopyID, BtnGift } = this;
	    BtnExplain.onClick(this, this.sendMessage, [ UIPlayerInfoMsg.OnBtnExplainClick ]);
	    BtnBack.onClick(this, this.sendMessage, [ UIPlayerInfoMsg.OnBtnBackClick ]);
	    BtnCopyID.onClick(this, this.sendMessage, [ UIPlayerInfoMsg.OnBtnCopyIDClick ]);
	    BtnGift.onClick(this, this.sendMessage, [ UIPlayerInfoMsg.OnBtnGiftClick ]);
    }

}
