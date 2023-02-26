declare type BattleLevel = ConfigLevelData | ConfigFuBenData | ConfigMiJingData | ConfigBossData;

declare interface IBattleCtrl {
    startBattle(data: BattleInput): void;
}

declare interface BattleInput extends UserInput {
    /** 战斗类型 */
    type: number;
    /** 关卡id */
    id: number;
    /** 采集专用，采集时长 */
    hour?: number;
}

declare interface BattleOutput extends UserOutput {
}