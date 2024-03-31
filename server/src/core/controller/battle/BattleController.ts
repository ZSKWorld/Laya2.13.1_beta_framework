import { AddCMD, Controller } from "../Controller";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class BattleController extends Controller implements IBattleCtrl {
    private _inBattle: boolean = false;
    private _battleInfo: IEnterBattleInput;

    @AddCMD
    enterBattle(data: IEnterBattleInput): void {
        const errorCode = BattleChecker.checkEnterBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this._inBattle = true;
        this._battleInfo = data;
        BattleHandle.enterBattle(this.user, data);
        this.response(data.cmd);
    }

    @AddCMD
    exitBattle(data: IExitBattleInput): void {
        const errorCode = BattleChecker.checkExitBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this._inBattle = false;
        this.response(data.cmd);
    }

    @AddCMD
    startGather(data: IStartGatherInput): void {
        const errorCode = BattleChecker.checkStartGather(this.user, data);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BattleHandle.startGather(this.user, data);
        this.response(data.cmd);
    }

    @AddCMD
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