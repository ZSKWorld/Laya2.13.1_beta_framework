import { CMD, CMDController } from "../CMDController";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class CMDBattle extends CMDController implements IBattleCtrl {

    @CMD
    enterBattle(data: IEnterBattleInput): void {
        const errorCode = BattleChecker.checkEnterBattle(this.connection, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.enterBattle(this.connection, data);
        this.response(data.cmd);
    }

    @CMD
    exitBattle(data: IExitBattleInput): void {
        const errorCode = BattleChecker.checkExitBattle(this.connection, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.exitBattle(this.connection, data);
        this.response(data.cmd);
    }

    @CMD
    startGather(data: IStartGatherInput): void {
        const errorCode = BattleChecker.checkStartGather(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.startGather(this.user, data);
        this.response(data.cmd);
    }

    @CMD
    breakOffGather(data: IBreakOffGatherInput): void {
        const errorCode = BattleChecker.checkBreakOffGather(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.breakOffGather(this.user, data);
        this.response(data.cmd);
    }

}