import { localData } from "../../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../../libs/localData/LocalDataKey";
import { AccountService } from "../../../../net/Services";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { tipMgr } from "../../../tool/TipManager";
import { UILoginMsg, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

export class UILoginCtrl extends BaseViewCtrl<UILoginView, UILoginData>{

    override onAdded() {
        this.addMessage(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
        this.addMessage(UILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
        this.addMessage(UILoginMsg.OnBtnCancelClick, this.onBtnCancelClick);
    }

    override onEnable(): void {
        const data = localData.get<LoginInput>(LocalDataKey.LastLoginAccount);
        data && this.view.refreshLoginInfo(data.account, data.password);
        data && this.toLogin(data);
    }

    toLogin(data: LoginInput) {
        data && this.view.refreshLoginInfo(data.account, data.password);
        this.onBtnLoginClick();
    }

    onLoginError() {
        this.view.refreshStatus(0);
        Laya.timer.clearAll(this);
    }

    private onBtnLoginClick() {
        const { input_account, input_password } = this.view;
        if (!input_account.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_password.text.trim()) tipMgr.showTip("请输入密码");
        else {
            this.view.refreshStatus(2);
            Laya.timer.once(2000, this, () => {
                const param = { account: input_account.text, password: input_password.text };
                AccountService.Inst.login(param);
            });
        }
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

    private onBtnCancelClick() {
        this.onLoginError();
    }

}