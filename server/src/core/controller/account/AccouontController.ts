import { Util } from "../../../utils/Util";
import { User } from "../../data/User";
import { ErrorCode } from "../../enum/ErrorCode";
import { AddCMD, Controller } from "../Controller";

export class AccouontController extends Controller implements IAccountCtrl {
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
            this.response<LoginOutput>(data.cmd);
            // this.response(data.cmd, null, ErrorCode.USER_LOGINED);
        } else {
            let user = Util.getData(data.account);
            if (!user) return this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else if (user.account.password != data.password) return this.response(data.cmd, null, ErrorCode.PASSWORD_ERROR);
            else this.connection.userLogin(user);
            this.response<LoginOutput>(data.cmd);
        }
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