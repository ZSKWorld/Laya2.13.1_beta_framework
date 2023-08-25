import UILogin from "../../../ui/PkgLogin/UILogin";
import { ResPath } from "../../../../common/ResPath";

export const enum UILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnLoginRegisterClick = "UILogin_OnBtnLoginRegisterClick",
	OnBtnRegisterBackClick = "UILogin_OnBtnRegisterBackClick",
	OnBtnRegisterClick = "UILogin_OnBtnRegisterClick",
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) {
    static readonly PkgRes = ResPath.PkgPath.PkgLogin;

	override onCreate() {
        const { btn_login, btn_loginRegister, btn_registerBack, btn_register } = this;
		btn_login.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnLoginClick ]);
		btn_loginRegister.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnLoginRegisterClick ]);
		btn_registerBack.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnRegisterBackClick ]);
		btn_register.onClick(this, this.sendMessage, [ UILoginMsg.OnBtnRegisterClick ]);
    }

}
