import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIChat from "../../ui/PkgMain/UIChat";

export const enum UIChatMsg {
	OnBtnSendClick = "UIChat_OnBtnSendClick",
	OnBtnBackClick = "UIChat_OnBtnBackClick",
}

export class UIChatView extends ExtensionClass<ViewExtension, UIChat>(UIChat) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
		const { BtnSend, BtnBack } = this;
		BtnSend.onClick(this, this.sendMessage, [ UIChatMsg.OnBtnSendClick ]);
		BtnBack.onClick(this, this.sendMessage, [ UIChatMsg.OnBtnBackClick ]);
	}

	setState(state: number) {
		this.state.selectedIndex = state;
	}

}
