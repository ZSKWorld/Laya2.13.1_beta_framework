import { Util } from "../../utils/Util";
import { ErrorCode } from "../ErrorCode";
import { UserData } from "../userdata/UserData";
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
                Util.saveData(new UserData(data.account, data.password, data.nickname));
                this.response(data.cmd, null);
            }
        }
    }
}