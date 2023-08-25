import UISetting from "../../../ui/PkgMain/UISetting";
import { ResPath } from "../../../../common/ResPath";

export const enum UISettingMsg {
	OnBtnHangUpClick = "UISetting_OnBtnHangUpClick",
	OnBtnMuteClick = "UISetting_OnBtnMuteClick",
	OnBtnSignInClick = "UISetting_OnBtnSignInClick",
	OnBtnHelpClick = "UISetting_OnBtnHelpClick",
	OnBtnClearAccountClick = "UISetting_OnBtnClearAccountClick",
	OnBtnBackClick = "UISetting_OnBtnBackClick",
}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_hangUp, btn_mute, btn_signIn, btn_help, btn_clearAccount, btn_back } = this;
		btn_hangUp.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnHangUpClick ]);
		btn_mute.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnMuteClick ]);
		btn_signIn.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnSignInClick ]);
		btn_help.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnHelpClick ]);
		btn_clearAccount.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnClearAccountClick ]);
		btn_back.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnBackClick ]);
    }

}
