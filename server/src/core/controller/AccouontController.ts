import { Util } from "../../utils/Util";
import { ErrorCode } from "../enum/ErrorCode";
import { UserData } from "../userdata/UserData";
import { AddCMD, BaseController } from "./BaseController";

export class AccouontController extends BaseController implements IAccount {
    @AddCMD
    register(data: RegisterInput): void {
        const userData = Util.getData(data.account);
        if (userData) this.response(data.cmd, null, ErrorCode.USER_EXIST);
        else {
            if (!data.account) this.response(data.cmd, null, ErrorCode.ACCOUNT_IS_EMPTY);
            else if (!data.password) this.response(data.cmd, null, ErrorCode.PASSWORD_IS_EMPTY);
            else if (!data.nickname) this.response(data.cmd, null, ErrorCode.NICKNAME_IS_EMPTY);
            else {
                new UserData(data.account, data.password, data.nickname).save();
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
            let userData = Util.getData(data.account);
            if (!userData) return this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else this.connection.userLogin(userData);
            this.response<LoginOutput>(data.cmd);
        }
    }

    @AddCMD
    clearAccount(data: ClearAccountInput): void {
        const userData = this.connection.userData;
        new UserData(userData.account, userData.password, userData.nickname).save();
        const newData = Util.getData(userData.account);
        this.connection.userLogin(newData);
        this.response<ClearAccountOutput>(data.cmd);
    }
}