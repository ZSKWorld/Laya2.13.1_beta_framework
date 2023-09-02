import { ResPath } from "../../../../common/ResPath";
import UILogin from "../../../ui/PkgLogin/UILogin";

export const enum UILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnRegisterClick = "UILogin_OnBtnRegisterClick",
	OnBtnCancelClick = "UILogin_OnBtnCancelClick",
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) {
	static readonly PkgRes = ResPath.PkgPath.PkgLogin;

	override onCreate() {
		const { btn_login, btn_register, btn_cancel } = this;
		btn_login.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnLoginClick ]);
		btn_register.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnRegisterClick ]);
		btn_cancel.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnCancelClick ]);
	}

	refreshLoginInfo(account: string, password: string) {
		this.input_account.text = account;
		this.input_password.text = password;
	}

	refreshStatus(status: 0 | 1 | 2) {
		this.ctrlState.selectedIndex = status;
	}

}
