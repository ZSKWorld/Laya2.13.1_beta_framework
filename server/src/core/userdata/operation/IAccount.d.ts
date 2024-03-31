declare interface IAccount extends IAccountData, IDecodeObject<IAccountData, IAccount> {
    get loginNextDay(): boolean;
    get onlineNextDay(): boolean;
}