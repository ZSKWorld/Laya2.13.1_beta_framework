import { DecodeData } from "./DecodeData";

export class AccountData extends DecodeData<IAccount> implements IAccount {
    private static readonly ClassName = "AccountData";
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;

}