import { Util } from "../../../utils/Util";
import { ErrorCode } from "../../enum/ErrorCode";

export class AccountChecker {
    static checkLogin(user: IUser, data: LoginInput, logined: boolean) {
        if (logined) {
            if (user.account.password != data.password) return ErrorCode.PASSWORD_ERROR;
        } else {
            let userData = Util.getData(data.account);
            if (!userData) return ErrorCode.USER_NOT_EXIST;
            else if (userData.account.password != data.password) return ErrorCode.PASSWORD_ERROR;
        }
        return ErrorCode.NONE;
    }

    static checkRegister(user: IUser, data: RegisterInput) {
        const userData = Util.getData(data.account);
        if (userData) return ErrorCode.USER_EXIST;
        else {
            if (!data.account) return ErrorCode.ACCOUNT_EMPTY;
            else if (!data.password) return ErrorCode.PASSWORD_EMPTY;
            else if (!data.nickname) return ErrorCode.NICKNAME_EMPTY;
        }
        return ErrorCode.NONE;
    }

    static checkSignIn(user: IUser, data: SignInInput) {
        if (user.base.signedIn) return ErrorCode.HadSignedIn;
        return ErrorCode.NONE;
    }
}