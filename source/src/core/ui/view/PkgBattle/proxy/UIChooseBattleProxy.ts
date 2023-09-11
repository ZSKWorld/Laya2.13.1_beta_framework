import { BattleType } from "../../../../net/enum/BattleEnums";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIChooseBattleCtrl } from "../controller/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl>{

    @RegisterEvent(NetMessage.StartBattle)
    private startBattle(output: StartBattleOutput, input: StartBattleInput) {
        if (input.type != BattleType.Gather) {
            this.viewCtrl.removeSelf();
            this.viewCtrl.showView(ViewID.UIBattleView);
        }
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
    }

    @RegisterEvent(NetMessage.StartBattleError)
    private startBattleError(output:StartBattleOutput, input:StartBattleInput){

    }
}