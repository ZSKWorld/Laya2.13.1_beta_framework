declare interface IBattleItem extends IBattleItemData, IDecode<IBattleItemData, IBattleItem> {

}

declare interface IBattle extends IBattleData, IDecode<IBattleData, IBattle> {

    /**关卡数据 */
    level: IBattleItem;
    /**副本数据 */
    copy: IBattleItem;
    /**秘境数据 */
    secret: IBattleItem;
    /**boss数据 */
    boss: IBattleItem;

    /** 获取剩余战斗次数，不包括采集 */
    getLeftCount(type: BattleType, id: number): number;
}