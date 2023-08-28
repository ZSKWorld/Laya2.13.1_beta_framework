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
    constructor(account: string, password: string, nickname: string) {
        super();
        this.account = account;
        this.password = password;
        this.nickname = nickname;
    }

    protected override beginEncode(): void {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
    }

    protected override afterDecode(): void {
        this.lastLoginTime = TimeUtil.getTimeStamp();
    }
}