declare interface IBattleData { }
declare interface IBattle extends IDecode<IBattle> {

    /**关卡数据 */
    level: IBattleData;
    /**副本数据 */
    copy: IBattleData;
    /**秘境数据 */
    secret: IBattleData;
    /**boss数据 */
    boss: IBattleData;
}