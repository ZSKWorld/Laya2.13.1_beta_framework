import { TimeUtil } from "../../utils/TimeUtil";
import { CantSyncObj } from "./CantSyncObj";

export class Account extends CantSyncObj implements IAccount {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;
    constructor(account: string, password: string, nickname: string) {
        super();
        this.account = account;
        this.password = password;
        this.nickname = nickname;
    }
    login(): void {
        this.lastLoginTime = TimeUtil.getTimeStamp();
    }
    logout(): void {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
    }
}