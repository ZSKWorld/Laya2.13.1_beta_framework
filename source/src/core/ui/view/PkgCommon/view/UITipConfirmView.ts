import UITipConfirm from "../../../ui/PkgCommon/UITipConfirm";
import { ResPath } from "../../../../common/ResPath";

export const enum UITipConfirmMsg {
	OnBtnConfirmClick = "UITipConfirm_OnBtnConfirmClick",
}

export class UITipConfirmView extends ExtensionClass<IView, UITipConfirm>(UITipConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        const { btn_confirm } = this;
		btn_confirm.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnConfirmClick ]);
    }

}
