import { TimeUtil } from "../../utils/TimeUtil";

export class Account implements IAccount {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;
    constructor(account: string, password: string, nickname: string) {
        this.account = account;
        this.password = password;
        this.nickname = nickname;
    }
    encode(): IAccount {
        return this;
    }

    decode(data: IAccount): IAccount {
        if (data)
            Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        return this;
    }

    login(): void {
        this.lastLoginTime = TimeUtil.getTimeStamp();
    }

    logout(): void {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
    }
}