declare interface ILevel extends ILevelData, IDecode<ILevelData, ILevel> {
    /** 开始战斗 */
    enterBattle(id: number): void;
}

declare interface ICopy extends ICopyData, IDecode<ICopyData, ICopy> {
    /** 获取副本剩余次数 */
    getLastCount(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface ISecret extends ISecretData, IDecode<ISecretData, ISecret> {
    /** 获取秘境剩余次数 */
    getLastCount(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface IBoss extends IBossData, IDecode<IBossData, IBoss> {
    /** 剩余冷却时间 */
    lastCoolTime(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface IGather extends IGatherData, IDecode<IGatherData, IGather> {
    /** 获取采集剩余次数 */
    getLastCount(id: number): number;
    /** 剩余采集时间 */
    lastGatherTime(id: number): number;
    /** 开始采集 */
    enterBattle(id: number, gatherTime:number): void;
    reset(): void;
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

    /** 获取配置表 */
    getConfig(type: BattleType, id: number): BattleLevel;
    /** 获取剩余次数，不包括采集 */
    getLastCount(type: BattleType, id: number): number;
    /** 是否冷却完毕 */
    getIsCooldown(type: BattleType, id: number): boolean;
    /** 获取精力消耗 */
    getVigorCost(type: BattleType, id: number): number;
    resetData(): void;
}