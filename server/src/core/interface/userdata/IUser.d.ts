declare interface IOffline {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}
declare interface IUser {
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

    getSyncInfo(): Partial<IUser>;
    clearSyncInfo(): void;

    /**
     * 登录
     * @param source 元数据
     */
    login(source: IUser): void;
    
    /** 登出 */
    logout(): void;

    /** 保存数据 */
    save(): void;
}