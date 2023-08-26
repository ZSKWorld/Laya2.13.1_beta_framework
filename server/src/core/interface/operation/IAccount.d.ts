declare interface IAccount extends IAccountData, IDecode<IAccountData, IAccount> {
    login(): void;
    logout(): void;
}