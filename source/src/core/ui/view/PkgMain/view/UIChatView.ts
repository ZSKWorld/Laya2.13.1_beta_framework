import UIChat from "../../../ui/PkgMain/UIChat";
import { ResPath } from "../../../../common/ResPath";

export const enum UIChatMsg {
	OnBtnSendClick = "UIChat_OnBtnSendClick",
	OnBtnBackClick = "UIChat_OnBtnBackClick",
}

export class UIChatView extends ExtensionClass<IView, UIChat>(UIChat) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_send, btn_back } = this;
		btn_send.onClick(this, this.sendMessage, [ UIChatMsg.OnBtnSendClick ]);
		btn_back.onClick(this, this.sendMessage, [ UIChatMsg.OnBtnBackClick ]);
    }

}
