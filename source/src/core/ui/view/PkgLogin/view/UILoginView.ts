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

		this.getChild("n5").visible = false;
		this.getChild("n6").visible = false;
		this.getChild("n10").visible = false;
		this.getChild("n12").visible = false;
		this.getChild("n14").visible = false;
		this.btn_login.visible = false;
		this.btn_loginRegister.visible = false;
		this.input_account.visible = false;
		this.input_password.visible = false;
	}

	refreshLoginInfo(account: string, password: string) {
		this.input_account.text = account;
		this.input_password.text = password;
	}

	refreshStatus(status: UILoginStatus) {
		this.ctrlState.selectedIndex = status;
	}

}
