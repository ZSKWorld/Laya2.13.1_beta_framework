import { cfgMgr } from "../../config/CfgManager";
import { BattleType } from "../../enum/BattleEnums";
import { ErrorCode } from "../../enum/ErrorCode";
import { AddCMD, Controller } from "../Controller";

export class BattleController extends Controller implements IBattleCtrl {

    @AddCMD
    startBattle(data: BattleInput): void {
        if (data.type == BattleType.CaiJi) {

        } else {
            let cfg: BattleLevel;
            switch (data.type) {
                case BattleType.GuanQia: cfg = cfgMgr.Level[ data.id ]; break;
                case BattleType.FuBen: cfg = cfgMgr.FuBen[ data.id ]; break;
                case BattleType.MiJing: cfg = cfgMgr.MiJing[ data.id ]; break;
                case BattleType.Boss: cfg = cfgMgr.Boss[ data.id ]; break;
                default: return this.response(data.cmd, null, ErrorCode.UNKNOWN_BATTLE_TYPE);
            }
            if (!cfg) return this.response(data.cmd, null, ErrorCode.UNKNOWN_BATTLE_LEVEL);
            const vigorCost = cfg.vigorCost;
            if (this.user.base.vigor < vigorCost) return this.response(data.cmd, null, ErrorCode.VIGOR_NOT_ENOUGH);
            if(this.user.battle)
        }
        this.response(data.cmd);
    }

}