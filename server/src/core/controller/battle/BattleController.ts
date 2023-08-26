import { AddCMD, Controller } from "../Controller";

export class BattleController extends Controller implements IBattleCtrl {

    @AddCMD
    startBattle(data: BattleInput): void {
        this.response(data.cmd);
    }

}