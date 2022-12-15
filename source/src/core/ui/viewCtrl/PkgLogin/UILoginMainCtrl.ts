import { localData } from "../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../libs/localData/LocalDataKey";
import { AccountService } from "../../../net/Services";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData {

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData>{

    override onAwake(): void {
        this.addMessage(UILoginMainMsg.OnBtnLoginClick, this.onBtnLoginClick);
        this.addMessage(UILoginMainMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
    }

    override onEnable(): void {
        const data = localData.get<LoginInput>(LocalDataKey.LastLoginAccount);
        data && this.view.setLoginInfo(data.account, data.password);
    }

    override onDisable(): void {

    }

    override onDestroy(): void {

    }

    private onBtnLoginClick(): void {
        const { TxtAccount, TxtPassword } = this.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        AccountService.Inst.login(param);
    }

    private onBtnRegisterClick(): void {
        const { TxtRegisterAccount, TxtRegisterPassword, TxtRegisterName } = this.view;
        if (!TxtRegisterAccount.text.trim()) UIUtility.showTipInfo("请输入账号");
        else if (!TxtRegisterPassword.text.trim()) UIUtility.showTipInfo("请输入密码");
        else if (!TxtRegisterName.text.trim()) UIUtility.showTipInfo("请输入昵称");
        else {
            AccountService.Inst.register({
                account: TxtRegisterAccount.text,
                password: TxtRegisterPassword.text,
                nickname: TxtRegisterName.text
            });
        }
    }

}