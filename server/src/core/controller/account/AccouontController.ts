import { Util } from "../../../utils/Util";
import { ErrorCode } from "../../enum/ErrorCode";
import { NotifyType } from "../../enum/NotifyType";
import { User } from "../../userdata/User";
import { AddCMD, Controller } from "../Controller";

export class AccouontController extends Controller implements IAccountCtrl {
    private _delta: number = 0;

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

    @AddCMD
    register(data: RegisterInput): void {
        const user = Util.getData(data.account);
        if (user) this.response(data.cmd, null, ErrorCode.USER_EXIST);
        else {
            if (!data.account) this.response(data.cmd, null, ErrorCode.ACCOUNT_EMPTY);
            else if (!data.password) this.response(data.cmd, null, ErrorCode.PASSWORD_EMPTY);
            else if (!data.nickname) this.response(data.cmd, null, ErrorCode.NICKNAME_EMPTY);
            else {
                new User(data.account, data.password, data.nickname).save();
                this.response(data.cmd);
            }
        }
    }

    @AddCMD
    login(data: LoginInput): void {
        if (this.connection.logined) {
            if (this.user.account.password != data.password) return this.response(data.cmd, null, ErrorCode.PASSWORD_ERROR);
            const syncInfo = { ...this.user };
            syncInfo.offline = this.user.getOffline();
            this.response<LoginOutput>(data.cmd, { syncInfo });
        } else {
            let user = Util.getData(data.account);
            if (!user) return this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else if (user.account.password != data.password) return this.response(data.cmd, null, ErrorCode.PASSWORD_ERROR);
            else this.connection.userLogin(user);
            this.response<LoginOutput>(data.cmd, { syncInfo: { offline: this.user.getOffline() } });
        }
    }

    signIn(data: SignInInput): void {
        if (this.user.base.signedIn) return this.response(data.cmd, null, ErrorCode.HadSignedIn);
        this.response(data.cmd);
    }

    @AddCMD
    clearAccount(data: ClearAccountInput): void {
        const { account, password, nickname } = this.user.account;
        new User(account, password, nickname).save();
        const newData = Util.getData(account);
        this.connection.userLogin(newData);
        this.response<ClearAccountOutput>(data.cmd);
    }
}