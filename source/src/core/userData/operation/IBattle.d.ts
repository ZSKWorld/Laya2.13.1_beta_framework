declare interface ILevel extends ILevelData, IDecode<ILevelData, ILevel> {

}

declare interface ICopy extends ICopyData, IDecode<ICopyData, ICopy> {
    /** 获取副本剩余次数 */
    getLastCount(id: number): number;
}

declare interface ISecret extends ISecretData, IDecode<ISecretData, ISecret> {
    /** 获取秘境剩余次数 */
    getLastCount(id: number): number;
}

declare interface IBoss extends IBossData, IDecode<IBossData, IBoss> {
    /** 获取剩余冷却时间 */
    lastCooldownTime(id: number): number;
}

declare interface IGather extends IGatherData, IDecode<IGatherData, IGather> {
    /** 获取采集剩余次数 */
    getLastCount(id: number): number;
    /** 剩余采集时间 */
    lastGatherTime(id: number): number;
}

declare interface IBattle extends IBattleData, IDecode<IBattleData, IBattle> {
    /**关卡数据 */
    level: ILevel;
    /**副本数据 */
    copy: ICopy;
    /**秘境数据 */
    secret: ISecret;
    /**boss数据 */
    boss: IBoss;
    /** 采集数据 */
    gather: IGather;
}