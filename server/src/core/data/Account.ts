import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Decode } from "./Decode";

export class Account extends Decode<IAccountData, IAccount> implements IAccount {
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
        this.uid = Util.generateUUID();
        this.registerTime = TimeUtil.getTimeStamp();
    }

    protected override afterEncode(): void {
        this.lastLoginTime = TimeUtil.getTimeStamp();
    }

    protected override afterDecode(): void {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
    }
}