declare interface IAccount extends IAccountData, IDecode<IAccountData, IAccount> {
    get loginNextDay(): boolean;
    get onlineNextDay(): boolean;
}