import { Decode } from "./Decode";

export class Account extends Decode<IAccountData> implements IAccount {
    private static readonly ClassName = "AccountData";
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;

}