declare interface IBattleItemData {

}

declare interface IBattleData {

    /**关卡数据 */
    level: IBattleItemData;
    /**副本数据 */
    copy: IBattleItemData;
    /**秘境数据 */
    secret: IBattleItemData;
    /**boss数据 */
    boss: IBattleItemData;
}