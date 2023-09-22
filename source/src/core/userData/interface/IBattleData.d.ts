declare interface ILevelData {

}

declare interface ICopyData {
    /** 各个副本使用的次数 */
    usedMap: KeyMap<number>;
}

declare interface ISecretData {
    /** 各个秘境使用的次数 */
    usedMap: KeyMap<number>;
}

declare interface IBossData {
    /** 各个boss上次挑战时间 */
    lastChallengeTime: KeyMap<number>;
}

declare interface IGatherData {
    /** 各个采集点已采集的次数 */
    usedMap: KeyMap<number>;
    /** 各个采集点开始时间 */
    startTimeMap: KeyMap<number>;
    /** 各个采集点采集时长 */
    gatherTimeMap: KeyMap<number>;
}

declare interface IBattleData {
    /**关卡数据 */
    level: ILevelData;
    /**副本数据 */
    copy: ICopyData;
    /**秘境数据 */
    secret: ISecretData;
    /**boss数据 */
    boss: IBossData;
    /** 采集数据 */
    gather: IGatherData;
}