import { CMDController, Command } from "../CMDController";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class CMDBattle extends CMDController implements IBattleCtrl {
    private _inBattle: boolean = false;
    private _battleInfo: IEnterBattleInput;

    @Command
    enterBattle(data: IEnterBattleInput): void {
        const errorCode = BattleChecker.checkEnterBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this._inBattle = true;
        this._battleInfo = data;
        BattleHandle.enterBattle(this.user, data);
        this.response(data.cmd);
    }

    @Command
    exitBattle(data: IExitBattleInput): void {
        const errorCode = BattleChecker.checkExitBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this._inBattle = false;
        this.response(data.cmd);
    }

    @Command
    startGather(data: IStartGatherInput): void {
        const errorCode = BattleChecker.checkStartGather(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.startGather(this.user, data);
        this.response(data.cmd);
    }

    @Command
    breakOffGather(data: IBreakOffGatherInput): void {
        const errorCode = BattleChecker.checkBreakOffGather(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.breakOffGather(this.user, data);
        this.response(data.cmd);
    }

    override close(): void {
        super.close();
        this._inBattle = false;
    }

    override recover(): void {
        super.recover();
        this.close();
    }

}