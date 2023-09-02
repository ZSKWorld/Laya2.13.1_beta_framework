declare interface IOfflineData {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}

declare interface IUserData {
    account: IAccountData;
    /** 基础数据 */
    base: IBaseData;
    /** 离线数据 */
    offline?: IOfflineData;
    /** 好友 */
    friend: IFriendData;
    /** 背包 */
    bag: IBagData;
    /** 身上物品 */
    body: IBodyData;
    /** 战斗 */
    battle: IBattleData;
}