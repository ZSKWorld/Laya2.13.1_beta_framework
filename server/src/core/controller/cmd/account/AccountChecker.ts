import { UserUtil } from "../../../../utils/UserUtil";
import { ErrorCode } from "../../../enum/ErrorCode";

export class AccountChecker {
    static checkLogin(user: IUser, data: ILoginInput, logined: boolean) {
        if (logined) {
            if (user.account.password != data.password) return ErrorCode.PASSWORD_ERROR;
        } else {
            let userData = UserUtil.getData(data.account);
            if (!userData) return ErrorCode.USER_NOT_EXIST;
            else if (userData.account.password != data.password) return ErrorCode.PASSWORD_ERROR;
        }
        return ErrorCode.NONE;
    }

    static checkRegister(user: IUser, data: IRegisterInput) {
        const userData = UserUtil.getData(data.account);
        if (userData) return ErrorCode.USER_EXIST;
        else {
            if (!data.account) return ErrorCode.ACCOUNT_EMPTY;
            else if (!data.password) return ErrorCode.PASSWORD_EMPTY;
            else if (!data.nickname) return ErrorCode.NICKNAME_EMPTY;
        }
        return ErrorCode.NONE;
    }

    static checkSignIn(user: IUser, data: ISignInInput) {
        if (user.base.signedIn) return ErrorCode.HadSignedIn;
        return ErrorCode.NONE;
    }
}