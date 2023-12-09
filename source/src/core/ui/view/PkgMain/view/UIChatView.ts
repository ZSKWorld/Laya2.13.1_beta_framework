import { ResPath } from "../../../../common/ResPath";
import UIChat from "../../../ui/PkgMain/UIChat";

export const enum UIChatMsg {
	OnBtnSendClick = "UIChat_OnBtnSendClick",
}

export class UIChatView extends ExtensionClass<IView, UIChat>(UIChat) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_send, btn_back } = this;
		btn_send.onClick(this, this.sendMessage, [UIChatMsg.OnBtnSendClick]);
		btn_back.onClick(this, this.removeSelf);
	}

}
