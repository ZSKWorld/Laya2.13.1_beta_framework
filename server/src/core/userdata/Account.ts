import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Decode } from "./Decode";

export class Account extends Decode<IAccountData, IAccount> implements IAccount {
    uid: string = Util.generateUUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = TimeUtil.getTimeStamp();
    lastLoginTime: number = 0;
    lastOnlineTime: number = 0;
    private _loginTime: number;
    private _lastLoginTime: number;
    private _onlineTime: number;

    get loginNextDay() {
        const { _lastLoginTime, _loginTime } = this;
        if (!_lastLoginTime || !_loginTime) return false;
        return TimeUtil.checkNetDay(_lastLoginTime, _loginTime);
    }

    get onlineNextDay() {
        if (!this._onlineTime) return false;
        const nowTime = TimeUtil.getTimeStamp();
        const isNextDay = TimeUtil.checkNetDay(this._onlineTime, nowTime);
        if (isNextDay) this._onlineTime = nowTime;
        return isNextDay;
    }


    constructor(account: string, password: string, nickname: string) {
        super();
        this.account = account;
        this.password = password;
        this.nickname = nickname;
    }

    protected override beginEncode() {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
    }

    protected override afterDecode() {
        const nowTime = TimeUtil.getTimeStamp();
        this._loginTime = nowTime;
        this._lastLoginTime = this.lastLoginTime;

        this._onlineTime = nowTime;
        this.lastLoginTime = nowTime;
    }
}