import { AddCMD, Controller } from "../Controller";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class BattleController extends Controller implements IBattleCtrl {

    @AddCMD
    enterBattle(data: EnterBattleInput): void {
        const { user } = this;
        const errorCode = BattleChecker.checkEnterBattle(user, data);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            BattleHandle.enterBattle(user, data);
            this.response(data.cmd);
        }
    }

    @AddCMD
    requestBattle(data: RequestBattleInput): void {
        this.response(data.cmd);
    }

    @AddCMD
    existBattle(data: ExistBattleInput): void {
        this.response(data.cmd);
    }

}