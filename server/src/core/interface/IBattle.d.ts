declare type BattleLevel = ConfigLevelData | ConfigFuBenData | ConfigMiJingData | ConfigBossData;

declare interface IBattle {
    startBattle(data:BattleInput): void;
}

declare interface BattleInput extends UserInput {
    type: number;
    id: number;
}

declare interface BattleOutput extends UserOutput {
}