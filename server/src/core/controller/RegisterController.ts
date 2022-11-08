import { Util } from "../../utils/Util";
import { ErrorCode } from "../enum/ErrorCode";
import { UserDataProxy } from "../userdata/dataProxy/UserDataProxy";
import { AddCMD, BaseController } from "./BaseController";

export class RegisterController extends BaseController implements IRegister {
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
                this.response(data.cmd, null);
            }
        }
    }
}