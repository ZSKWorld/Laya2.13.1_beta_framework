import { Util } from "../../../../utils/Util";
import { NotifyType } from "../../../enum/NotifyType";
import { User } from "../../../userdata/User";
import { CMDController, Command } from "../CMDController";
import { AccountChecker } from "./AccountChecker";

export class CMDAccouont extends CMDController implements IAccountCtrl {

    @Command
    login(data: ILoginInput): void {
        const logined = this.connection.logined;
        const errorCode = AccountChecker.checkLogin(this.user, data, logined);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        if (logined) {
            const syncInfo = { ...this.user };
            syncInfo.offline = this.user.getOffline();
            this.response<ILoginOutput>(data.cmd, { syncInfo });
        } else {
            this.connection.userLogin(Util.getData(data.account));
            this.response<ILoginOutput>(data.cmd, { syncInfo: { offline: this.user.getOffline() } });
        }
    }

    @Command
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

    @Command
    clearAccount(data: IClearAccountInput): void {
        const { account, password, nickname } = this.user.account;
        new User(account, password, nickname).save();
        const newData = Util.getData(account);
        this.connection.user.decode(newData);
        this.response<IClearAccountOutput>(data.cmd);
    }
}