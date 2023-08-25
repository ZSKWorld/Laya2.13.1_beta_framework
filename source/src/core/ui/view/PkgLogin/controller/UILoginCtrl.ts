import { AccountService } from "../../../../net/Services";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { tipMgr } from "../../../tool/TipManager";
import { UILoginMsg, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

export class UILoginCtrl extends BaseViewCtrl<UILoginView, UILoginData>{

    override onAdded() {
		this.addMessage(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
		this.addMessage(UILoginMsg.OnBtnLoginRegisterClick, this.onBtnLoginRegisterClick);
		this.addMessage(UILoginMsg.OnBtnRegisterBackClick, this.onBtnRegisterBackClick);
		this.addMessage(UILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
    }

	private onBtnLoginClick() {
        const { input_account, input_password } = this.view;
        if (!input_account.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_password.text.trim()) tipMgr.showTip("请输入密码");
        else {
			const param = { account: input_account.text, password: input_password.text };
			AccountService.Inst.login(param);
        }
	}

	private onBtnLoginRegisterClick() {

	}

	private onBtnRegisterBackClick() {

	}

	private onBtnRegisterClick() {
        const { input_rAccount, input_rPassword, input_rName } = this.view;
        if (!input_rAccount.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_rPassword.text.trim()) tipMgr.showTip("请输入密码");
        else if (!input_rName.text.trim()) tipMgr.showTip("请输入昵称");
        else {
            AccountService.Inst.register({
                account: input_rAccount.text,
                password: input_rPassword.text,
                nickname: input_rName.text
            });
        }
	}

}