declare interface IBattleItem { }
declare interface IBattleData extends IDecode<IBattleData> {
    /**关卡数据 */
    level: IBattleItem;
    /**副本数据 */
    copy: IBattleItem;
    /**秘境数据 */
    secret: IBattleItem;
    /**boss数据 */
    boss: IBattleItem;
}