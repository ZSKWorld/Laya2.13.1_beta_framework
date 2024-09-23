import { localData } from "../../../../game/localData/LocalData";
import { LocalDataKey } from "../../../../game/localData/LocalDataKey";
import { SocketEvent } from "../../../../net/WebSocket";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { tipMgr } from "../../../tool/TipManager";
import { UILoginEvent } from "../event/UILoginEvent";
import { UILoginMsg, UILoginStatus, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

export class UILoginCtrl extends BaseViewCtrl<UILoginView, UILoginData> {

    override onAdded() {
        this.addMessage(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
        this.addMessage(UILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
        this.addMessage(UILoginMsg.OnBtnCancelClick, this.onBtnCancelClick);
    }

    override onEnable() {
        const data = localData.get<ILoginInput>(LocalDataKey.LastLoginAccount);
        data && this.view.refreshLoginInfo(data.account, data.password);
        data && this.login(data);
    }

    @ViewMessage(UILoginEvent.Login)
    private login(data: ILoginInput) {
        data && this.view.refreshLoginInfo(data.account, data.password);
        this.onBtnLoginClick();
    }

    private onBtnLoginClick() {
        const { input_account, input_password } = this.view;
        if (!input_account.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_password.text.trim()) tipMgr.showTip("请输入密码");
        else {
            this.view.refreshStatus(UILoginStatus.BeLogin);
            Laya.timer.once(1000, this, () => {
                const param = { account: input_account.text, password: input_password.text };
                netService.login(param);
            });
        }
    }

    private onBtnRegisterClick() {
        const { input_rAccount, input_rPassword, input_rName } = this.view;
        if (!input_rAccount.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_rPassword.text.trim()) tipMgr.showTip("请输入密码");
        else if (!input_rName.text.trim()) tipMgr.showTip("请输入昵称");
        else {
            netService.register({
                account: input_rAccount.text,
                password: input_rPassword.text,
                nickname: input_rName.text
            });
        }
    }

    @RegisterEvent(SocketEvent.Close)
    @ViewMessage(UILoginEvent.OnLoginFailed)
    private onBtnCancelClick() {
        this.view.refreshStatus(UILoginStatus.Login);
        Laya.timer.clearAll(this);
    }

}