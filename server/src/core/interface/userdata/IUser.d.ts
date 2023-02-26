
declare interface KeyData<T = number> { [ id: string ]: T; }
declare interface IOffline {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}
declare interface IUser {
    account: IAccount;
    base: IBase;
    /** 好友列表 */
    friends: string[];

    /** 离线数据 */
    offline?: IOffline;
    /**关卡数据 */
    level: KeyData;
    /**副本数据 */
    copy: KeyData;
    /**秘境数据 */
    secret: KeyData;
    /**boss数据 */
    boss: KeyData;
    /**心法数据 */
    citta: KeyData;
    /**技能数据 */
    skill: number[];
    /**出战技能 */
    usingSkill: number[];
    /** 背包 */
    bag: IBag;
    /** 身上物品 */
    body: IBody;
}