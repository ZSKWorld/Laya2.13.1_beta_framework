declare interface ILevel extends ILevelData, IDecodeObject<ILevelData, ILevel> {

}

declare interface ICopy extends ICopyData, IDecodeObject<ICopyData, ICopy> {
    /** 获取副本剩余次数 */
    getLastCount(id: number): number;
}

declare interface ISecret extends ISecretData, IDecodeObject<ISecretData, ISecret> {
    /** 获取秘境剩余次数 */
    getLastCount(id: number): number;
}

declare interface IBoss extends IBossData, IDecodeObject<IBossData, IBoss> {
    /** 获取剩余冷却时间 */
    lastCooldownTime(id: number): number;
}

declare interface IGather extends IGatherData, IDecodeObject<IGatherData, IGather> {
    /** 剩余采集时间 */
    remainTime(id: number): number;
}

declare interface IBattle extends IBattleData, IDecodeObject<IBattleData, IBattle> {
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