import UITipConfirm from "../../../ui/PkgCommon/UITipConfirm";
import { ResPath } from "../../../../common/ResPath";

export const enum UITipConfirmMsg {
	OnBtnBgClick = "UITipConfirm_OnBtnBgClick",
	OnBtnConfirmClick = "UITipConfirm_OnBtnConfirmClick",
}

export class UITipConfirmView extends ExtensionClass<IView, UITipConfirm>(UITipConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        const { BtnBg, BtnConfirm } = this;
		BtnBg.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnBgClick ]);
		BtnConfirm.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnConfirmClick ]);
    }

}
