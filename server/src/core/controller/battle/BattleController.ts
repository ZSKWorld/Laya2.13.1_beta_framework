import { AddCMD, BaseController } from "../BaseController";

export class BattleController extends BaseController implements IBattleCtrl {

    @AddCMD
    startBattle(data: BattleInput): void {
        this.response(data.cmd);
    }
    
}