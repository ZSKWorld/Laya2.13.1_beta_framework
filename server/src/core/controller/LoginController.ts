import { Util } from "../../utils/Util";
import { ErrorCode } from "../ErrorCode";
import { AddCMD, BaseController } from "./BaseController";

export class LoginController extends BaseController implements ILogin {
    @AddCMD
    login(data: LoginInput): void {
        let userData: IUserData;
        if (this.connection.logined == false) {
            userData = Util.getData(data.account, data.password);
            if (!userData) return this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else this.connection.userLogin(userData);
        }
        userData = JSON.parse(JSON.stringify(this.connection.playerData));
        this.response(data.cmd, { syncInfo: userData });
    }
}