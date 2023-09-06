declare type BattleLevel = CfgLevelData | CfgCopyData | CfgSecretData | CfgBossData;

declare interface IBattleCtrl {
    startBattle(data: StartBattleInput): void;
}

declare interface StartBattleInput extends UserInput {
    /** 战斗类型 */
    type: number;
    /** 关卡id */
    id: number;
    /** 采集专用，采集时长 */
    hour?: number;
}

declare interface StartBattleOutput extends UserOutput {
}