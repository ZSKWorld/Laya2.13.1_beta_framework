import UILogin from "../../../ui/PkgLogin/UILogin";

export const enum UILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnRegisterClick = "UILogin_OnBtnRegisterClick",
	OnBtnCancelClick = "UILogin_OnBtnCancelClick",
}

export const enum UILoginStatus {
	Login,
	Register,
	BeLogin,
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) {
	static readonly pkgRes = ResPath.PkgPath.PkgLogin;

	override onCreate() {
		const { btn_login, btn_register, btn_cancel } = this;
		btn_login.onClick(this, this.sendMessage, [UILoginMsg.OnBtnLoginClick]);
		btn_register.onClick(this, this.sendMessage, [UILoginMsg.OnBtnRegisterClick]);
		btn_cancel.onClick(this, this.sendMessage, [UILoginMsg.OnBtnCancelClick]);
	}

	refreshLoginInfo(account: string, password: string) {
		this.input_account.text = account;
		this.input_password.text = password;
	}

	refreshStatus(status: UILoginStatus) {
		this.ctrlState.selectedIndex = status;
	}

}
