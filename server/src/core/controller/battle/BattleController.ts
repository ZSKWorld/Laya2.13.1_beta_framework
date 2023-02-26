import { AddCMD, BaseController } from "../base/BaseController";

export class BattleController extends BaseController implements IBattleCtrl {

    @AddCMD
    startBattle(data: BattleInput): void {
        this.response(data.cmd);
    }
    
}