declare interface ILevel extends ILevelData, IDecodeObject<ILevelData, ILevel> {
    /** 开始战斗 */
    enterBattle(id: number): void;
}

declare interface ICopy extends ICopyData, IDecodeObject<ICopyData, ICopy> {
    /** 获取副本剩余次数 */
    getLastCount(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface ISecret extends ISecretData, IDecodeObject<ISecretData, ISecret> {
    /** 获取秘境剩余次数 */
    getLastCount(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface IBoss extends IBossData, IDecodeObject<IBossData, IBoss> {
    /** 剩余冷却时间 */
    lastCoolTime(id: number): number;
    /** 开始战斗 */
    enterBattle(id: number): void;
    reset(): void;
}

declare interface IGather extends IGatherData, IDecodeObject<IGatherData, IGather> {
    /** 剩余采集时间 */
    remainTime(id: number): number;
    /** 开始采集 */
    startGather(id: number, gatherTime: number): void;
    /** 停止采集 */
    breakOffGather(id: number): void;
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

    /** 
     * 获取配置表
     * @param type {@link BattleType}
     */
    getConfig(type: number, id: number): BattleCfgData;
    /** 
     * 获取剩余次数，不包括采集
     * @param type {@link BattleType}
     */
    getLastCount(type: number, id: number): number;
    /** 
     * 是否冷却完毕
     * @param type {@link BattleType}
     */
    getIsCooldown(type: number, id: number): boolean;
    /** 
     * 获取精力消耗
     * @param type {@link BattleType}
     */
    getVigorCost(type: number, id: number): number;
    resetData(): void;
}