import { Util } from "../../utils/Util";
import { ErrorCode } from "../enum/ErrorCode";
import { UserDataProxy } from "../userdata/dataProxy/UserDataProxy";
import { AddCMD, BaseController } from "./BaseController";

export class AccouontController extends BaseController implements IAccount {
    @AddCMD
    register(data: RegisterInput): void {
        const userData = Util.getData(data.account, data.password);
        if (userData) this.response(data.cmd, null, ErrorCode.USER_EXIST);
        else {
            if (!data.account) this.response(data.cmd, null, ErrorCode.ACCOUNT_IS_EMPTY);
            else if (!data.password) this.response(data.cmd, null, ErrorCode.PASSWORD_IS_EMPTY);
            else if (!data.nickname) this.response(data.cmd, null, ErrorCode.NICKNAME_IS_EMPTY);
            else {
                new UserDataProxy(data.account, data.password, data.nickname).save();
                this.response(data.cmd);
            }
        }
    }

    @AddCMD
    login(data: LoginInput): void {
        let userData: IUserData;
        if (this.connection.logined == false) {
            userData = Util.getData(data.account, data.password);
            if (!userData) return this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else this.connection.userLogin(userData);
        }
        userData = JSON.parse(this.connection.userData.getJSONData());
        this.response(data.cmd, { syncInfo: userData });
    }

    @AddCMD
    clearAccount(data: UserInput): void {
        const userData = this.connection.userData;
        new UserDataProxy(userData.getAccount(), userData.getPassword(), userData.getNickname()).save();
        const newData = Util.getData(userData.getAccount(), userData.getPassword());
        this.connection.userLogin(newData);
        this.response(data.cmd, { syncInfo: newData });
    }
}