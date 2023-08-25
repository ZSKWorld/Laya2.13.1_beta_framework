import { ResPath } from "../../../common/ResPath";
import UITipConfirm from "../../ui/PkgCommon/UITipConfirm";

export const enum UITipConfirmMsg {
	OnBtnBgClick = "UITipConfirm_OnBtnBgClick",
	OnBtnConfirmClick = "UITipConfirm_OnBtnConfirmClick",
}

export class UITipConfirmView extends ExtensionClass<IView, UITipConfirm>(UITipConfirm) {
	static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate(): void {
		const { BtnBg, BtnConfirm } = this;
		BtnBg.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnBgClick ]);
		BtnConfirm.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnConfirmClick ]);
	}

	setContent(text: string, title: string) {
		this.TxtContent.text = text;
		this.TxtTitle.text = title || "提示";
	}

}
