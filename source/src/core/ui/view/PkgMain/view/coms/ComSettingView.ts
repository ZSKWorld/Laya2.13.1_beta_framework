import ComSetting from "../../../../ui/PkgMain/ComSetting";

export const enum ComSettingMsg {
	OnBtnMuteClick = "ComSetting_OnBtnMuteClick",
	OnBtnSignInClick = "ComSetting_OnBtnSignInClick",
	OnBtnHelpClick = "ComSetting_OnBtnHelpClick",
	OnBtnClearAccountClick = "ComSetting_OnBtnClearAccountClick",
}

export class ComSettingView extends ExtensionClass<IView, ComSetting>(ComSetting) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_mute, btn_signIn, btn_help, btn_clearAccount, btn_back } = this;
		btn_mute.onClick(this, this.sendMessage, [ComSettingMsg.OnBtnMuteClick]);
		btn_signIn.onClick(this, this.sendMessage, [ComSettingMsg.OnBtnSignInClick]);
		btn_help.onClick(this, this.sendMessage, [ComSettingMsg.OnBtnHelpClick]);
		btn_clearAccount.onClick(this, this.sendMessage, [ComSettingMsg.OnBtnClearAccountClick]);
		btn_back.onClick(this, this.removeView, [ViewID.UISettingView]);
	}

}
