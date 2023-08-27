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

    /** 副本剩余次数 */
    getCopyTime(copyId: number): number;

    /** 秘境剩余次数 */
    getSecretTime(secretId: number): number;
    
    /** 获取boss剩余冷却时间 */
    getBossCoolDown(bossId: number): number;
}