import { BattleType } from "../../enum/BattleEnums";
import { AddCMD, Controller } from "../Controller";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class BattleController extends Controller implements IBattleCtrl {
    private _inBattle: boolean = false;
    private _battleType: number;
    private _battleId: number;

    @AddCMD
    enterBattle(data: EnterBattleInput): void {
        const errorCode = BattleChecker.checkEnterBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        if (data.type != BattleType.Gather) {
            this._inBattle = true;
            this._battleId = data.id;
            this._battleType = data.type;
        }
        BattleHandle.enterBattle(this.user, data);
        this.response(data.cmd);
    }

    @AddCMD
    requestBattle(data: RequestBattleInput): void {
        const errorCode = BattleChecker.checkRequestBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this.response(data.cmd);
    }

    @AddCMD
    exitBattle(data: ExitBattleInput): void {
        const errorCode = BattleChecker.checkExitBattle(this.user, data, this._inBattle);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        this._inBattle = false;
        this.response(data.cmd);
    }

    override recover(): void {
        this._inBattle = false;
        super.recover();
    }

}