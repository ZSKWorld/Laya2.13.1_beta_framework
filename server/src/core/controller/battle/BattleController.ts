import { AddCMD, Controller } from "../Controller";
import { BattleChecker } from "./BattleChecker";
import { BattleHandle } from "./BattleHandle";

export class BattleController extends Controller implements IBattleCtrl {

    @AddCMD
    startBattle(data: BattleInput): void {
        const { user } = this;
        const errorCode = BattleChecker.checkStartBattle(user, data);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            BattleHandle.startBattle(user, data);
            this.response(data.cmd);
        }
    }

}