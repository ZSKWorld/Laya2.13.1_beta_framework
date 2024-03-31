declare type BattleCfg = CfgLevel | CfgCopy | CfgSecret | CfgBoss | CfgGather;
declare type BattleCfgData = CfgLevelData | CfgCopyData | CfgSecretData | CfgBossData | CfgGatherData;

declare interface IBattleCtrl {
    enterBattle(data: IEnterBattleInput): void;
    exitBattle(data: IExitBattleInput): void;
    startGather(data: IStartGatherInput): void;
    breakOffGather(data: IBreakOffGatherInput): void;
}

declare interface IEnterBattleInput extends IUserInput {
    /** 战斗类型 BattleType枚举 */
    type: number;
    /** 关卡id */
    id: number;
}

declare interface IEnterBattleOutput extends IUserOutput {
}


declare interface IExitBattleInput extends IUserInput {
}

declare interface IExitBattleOutput extends IUserOutput {
}

declare interface IStartGatherInput extends IUserInput {
    id: number;
    /** 采集时长，秒 */
    gatherTime?: number;
}

declare interface IStartGatherOutput extends IUserOutput {
}

declare interface IBreakOffGatherInput extends IUserInput {
    id: number;
}

declare interface IBreakOffGatherOutput extends IUserOutput {
}