declare type OriginData<T> = Pick<T, NonReadonlyKeys<T> & NonMethodKeys<T>>;
declare type OriginDataKeys<T> = NonReadonlyKeys<T> & NonMethodKeys<T>;
declare interface IOffline {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}

declare interface IUser extends IDecodeObject<IUser> {
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