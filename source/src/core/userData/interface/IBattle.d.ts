declare interface ILevel extends IDecodeObject<ILevel> {

}

declare interface ICopy extends IDecodeObject<ICopy> {
    /** 各个副本使用的次数 */
    usedMap: KeyMap<number>;
    /** 获取副本剩余次数 */
    getLastCount(id: number): number;
}

declare interface ISecret extends IDecodeObject<ISecret> {
    /** 各个秘境使用的次数 */
    usedMap: KeyMap<number>;
    /** 获取秘境剩余次数 */
    getLastCount(id: number): number;
}

declare interface IBoss extends IDecodeObject<IBoss> {
    /** 各个boss上次挑战时间 */
    lastChallengeTime: KeyMap<number>;
    /** 剩余冷却时间 */
    lastCoolTime(id: number): number;
}

declare interface IGather extends IDecodeObject<IGather> {
    /** 各个采集点开始时间 */
    startTimeMap: KeyMap<number>;
    /** 各个采集点采集时长 */
    gatherTimeMap: KeyMap<number>;
    /** 剩余采集时间 */
    remainTime(id: number): number;
}

declare interface IBattle extends IDecodeObject<IBattle> {
    /** 战斗速度 */
    battleSpeed: number;
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