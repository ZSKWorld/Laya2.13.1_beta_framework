import { ClassName, Decode } from "./Decode";

@ClassName("AccountData")
export class Account extends Decode<IAccountData> implements IAccount {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    lastOnlineTime: number;

}