declare interface IOfflineData extends IDecode<IOfflineData> {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}
declare interface IUserData   extends IDecode<IUserData>{
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
}