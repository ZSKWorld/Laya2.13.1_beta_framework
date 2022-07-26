import { ResPath } from "../../../common/ResPath";
import { LocalStorageKey } from "../../../libs/localStorage/LocalStorageKey";
import { ExtensionClass } from "../../../libs/utils/Util";
import { AccountData } from "../../../playerData/AccountData";
import { ViewExtension } from "../../core/interfaces";
import UILoginMain from "../../ui/PkgLogin/UILoginMain";

export const enum UILoginMainMsg {
	OnBtnLoginClick = "UILoginMain_OnBtnLoginClick",
	OnBtnRegisterClick = "UILoginMain_OnBtnRegisterClick",
}

export class UILoginMainView extends ExtensionClass<ViewExtension, UILoginMain>(UILoginMain) {
	static PkgRes = ResPath.Ui_PkgLogin;

	onCreate(): void {
		const { BtnLogin, BtnLoginRegister, BtnRegisterBack, BtnRegister } = this;
		BtnLogin.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnLoginClick]);
		BtnLoginRegister.onClick(this, this.toRegist);
		BtnRegisterBack.onClick(this, this.toLogin);
		BtnRegister.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnRegisterClick]);

		const lastLoginAccount = AccountData.getLocalData(LocalStorageKey.LastLoginAccount);
		this.setAccountTxt(lastLoginAccount?.account, lastLoginAccount?.password);
	}

	toRegist() {
		const { ctrlState, TxtRegisterAccount, TxtRegisterPassword, TxtRegisterName } = this;
		ctrlState.selectedIndex = 1;
		TxtRegisterAccount.text = "";
		TxtRegisterPassword.text = "";
		TxtRegisterName.text = "";
	}

	toLogin() {
		this.ctrlState.selectedIndex = 0;
	}

	setAccountTxt(account: string, password: string) {
		const { TxtAccount, TxtPassword } = this;
		TxtAccount.text = account || "";
		TxtPassword.text = password || "";
	}

}


