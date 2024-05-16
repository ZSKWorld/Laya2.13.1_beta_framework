import { GameUtil } from "../../utils/GameUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { DecodeObject } from "./DecodeObject";

export class Account extends DecodeObject<IAccount> implements IAccount {
    uid: string = GameUtil.getUUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = TimeUtil.milliSeconds();
    lastLoginTime: number = 0;
    lastOnlineTime: number = 0;
    private _loginTime: number;
    private _lastLoginTime: number;
    private _onlineTime: number;

    get loginNextDay() {
        const { _lastLoginTime, _loginTime } = this;
        if (!_lastLoginTime || !_loginTime) return false;
        return TimeUtil.checkNextDay(_lastLoginTime, _loginTime);
    }

    get onlineNextDay() {
        if (!this._onlineTime) return false;
        const nowTime = TimeUtil.milliSeconds();
        const isNextDay = TimeUtil.checkNextDay(this._onlineTime, nowTime);
        if (isNextDay) this._onlineTime = nowTime;
        return isNextDay;
    }


    constructor(account: string, password: string, nickname: string) {
        super();
        this.account = account;
        this.password = password;
        this.nickname = nickname;
    }

    protected override onBeginEncode() {
        this.lastOnlineTime = TimeUtil.milliSeconds();
    }

    protected override onEndDecode() {
        const nowTime = TimeUtil.milliSeconds();
        this._loginTime = nowTime;
        this._lastLoginTime = this.lastLoginTime;

        this._onlineTime = nowTime;
        this.lastLoginTime = nowTime;
    }
}