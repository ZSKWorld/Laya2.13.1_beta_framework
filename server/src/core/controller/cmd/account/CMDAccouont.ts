import { UserUtil } from "../../../../utils/UserUtil";
import { User } from "../../../userdata/User";
import { CMD, CMDController } from "../CMDController";
import { AccountChecker } from "./AccountChecker";

export class CMDAccouont extends CMDController implements IAccountCtrl {

    @CMD
    login(data: ILoginInput): void {
        const logined = this.connection.logined;
        const errorCode = AccountChecker.checkLogin(this.user, data, logined);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this.connection.userLogin(UserUtil.getData(data.account));
        this.response<ILoginOutput>(data.cmd, { syncInfo: { offline: this.user.getOffline() } });
    }

    @CMD
    register(data: IRegisterInput): void {
        const errorCode = AccountChecker.checkRegister(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        new User(data.account, data.password, data.nickname).save();
        this.response(data.cmd);
    }

    signIn(data: ISignInInput): void {
        const errorCode = AccountChecker.checkSignIn(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this.response(data.cmd);
    }

    @CMD
    clearAccount(data: IClearAccountInput): void {
        const { account, password, nickname } = this.user.account;
        new User(account, password, nickname).save();
        const newData = UserUtil.getData(account);
        this.connection.user.decode(newData);
        this.response<IClearAccountOutput>(data.cmd);
    }
}