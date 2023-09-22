import { Util } from "../../../utils/Util";
import { NotifyType } from "../../enum/NotifyType";
import { User } from "../../userdata/User";
import { AddCMD, Controller } from "../Controller";
import { AccountChecker } from "./AccountChecker";

export class AccouontController extends Controller implements IAccountCtrl {
    private _delta: number = 0;

    @AddCMD
    login(data: LoginInput): void {
        const logined = this.connection.logined;
        const errorCode = AccountChecker.checkLogin(this.user, data, logined);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        if (logined) {
            const syncInfo = { ...this.user };
            syncInfo.offline = this.user.getOffline();
            this.response<LoginOutput>(data.cmd, { syncInfo });
        } else {
            this.connection.userLogin(Util.getData(data.account));
            this.response<LoginOutput>(data.cmd, { syncInfo: { offline: this.user.getOffline() } });
        }
    }

    @AddCMD
    register(data: RegisterInput): void {
        const errorCode = AccountChecker.checkRegister(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        new User(data.account, data.password, data.nickname).save();
        this.response(data.cmd);
    }

    signIn(data: SignInInput): void {
        const errorCode = AccountChecker.checkSignIn(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this.response(data.cmd);
    }

    @AddCMD
    clearAccount(data: ClearAccountInput): void {
        const { account, password, nickname } = this.user.account;
        new User(account, password, nickname).save();
        const newData = Util.getData(account);
        this.connection.user.decode(newData);
        this.response<ClearAccountOutput>(data.cmd);
    }

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 60000) {
            this._delta = 0;
            if (this.connection.logined) {
                if (this.user.checkOnlineNextDay())
                    this.notify(NotifyType.OnlineNextDay);
            }
        }
    }
}