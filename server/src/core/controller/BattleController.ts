import { ErrorCode } from "../enum/ErrorCode";
import { AddCMD, BaseController } from "./BaseController";

export class BattleController extends BaseController implements IBattle {

    @AddCMD
    startBattle(data: BattleInput): void {
        this.response(data.cmd);
    }
    
}