declare interface IOffline extends IOfflineData {

}

declare interface IUser extends IUserData, IDecodeObject<IUserData, IUser> {
    account: IAccount;
    base: IBase;
    /** 离线数据 */
    offline?: IOffline;
    /** 好友 */
    friend: IFriend;
    /** 背包 */
    bag: IBag;
    /** 身上物品 */
    body: IBody;
    /** 战斗 */
    battle: IBattle;

    getSyncInfo?(): Partial<IUser>;

    clearSyncInfo?(): void;

    getOffline(): IOffline;

    checkOnlineNextDay(): boolean;

    save(): void;
}