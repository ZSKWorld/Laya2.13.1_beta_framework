import { ClassName, DecodeObject } from "./DecodeObject";

@ClassName("Account")
export class Account extends DecodeObject<IAccount> implements IAccount {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;
}