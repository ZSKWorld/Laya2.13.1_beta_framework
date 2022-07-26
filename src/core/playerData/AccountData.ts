import { storage } from "../libs/localStorage/LocalStorage";

export class AccountData {
    private _account: string = "";
    private _password: string = "";
    private _nickName: string = "";
    loginning: boolean = false;

    get account() {
        return this._account;
    }
    get password() {
        return this._password;
    }

    get nickName() {
        return this._nickName;
    }

    constructor(account: string, password: string, nickName: string) {
        this._account = account;
        this._password = password;
        this._nickName = nickName;
    }

    static getLocalData(key: string) {
        const data = storage.get<AccountData>(key);
        let result: AccountData;
        if (data) {
            result = new AccountData(data._account, data._password, data._nickName);
            result.loginning = !!data.loginning;
        }
        return result;
    }
}