import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UISetting from "../../ui/PkgMain/UISetting";

export const enum UISettingMsg {
	OnBtnHangUpClick = "UISetting_OnBtnHangUpClick",
	OnBtnMuteClick = "UISetting_OnBtnMuteClick",
	OnBtnSignInClick = "UISetting_OnBtnSignInClick",
	OnBtnHelpClick = "UISetting_OnBtnHelpClick",
	OnBtnClearAccountClick = "UISetting_OnBtnClearAccountClick",
}

export class UISettingView extends ExtensionClass<ViewExtension, UISetting>(UISetting) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnBg, BtnHangUp, BtnMute, BtnSignIn, BtnHelp, BtnClearAccount, BtnBack } = this;
		BtnBg.onClick(this, this.removeTop);
		BtnBack.onClick(this, this.removeTop);
		BtnHangUp.onClick(this, this.sendMessage, [UISettingMsg.OnBtnHangUpClick]);
		BtnMute.onClick(this, this.sendMessage, [UISettingMsg.OnBtnMuteClick]);
		BtnSignIn.onClick(this, this.sendMessage, [UISettingMsg.OnBtnSignInClick]);
		BtnHelp.onClick(this, this.sendMessage, [UISettingMsg.OnBtnHelpClick]);
		BtnClearAccount.onClick(this, this.sendMessage, [UISettingMsg.OnBtnClearAccountClick]);
	}

}
