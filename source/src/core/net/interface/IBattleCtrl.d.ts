declare type BattleLevel = CfgLevelData | CfgCopyData | CfgSecretData | CfgBossData | CfgGatherData;

declare interface IBattleCtrl {
    enterBattle(data: EnterBattleInput): void;
    requestBattle(data: RequestBattleInput): void;
    existBattle(data: ExistBattleInput): void;
}

declare interface EnterBattleInput extends UserInput {
    /** 战斗类型 */
    type: number;
    /** 关卡id */
    id: number;
    /** 采集专用，采集时长，单位秒 */
    gatherTime?: number;
}

declare interface EnterBattleOutput extends UserOutput {
}

declare interface RequestBattleInput extends UserInput {
}

declare interface RequestBattleOutput extends UserOutput {
}

declare interface ExistBattleInput extends UserInput {
}

declare interface ExistBattleOutput extends UserOutput {
}