import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIChooseBattleCtrl } from "../controller/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl>{

    @RegisterEvent(NetMessage.StartBattle)
    private startBattle(output:StartBattleOutput, input:StartBattleInput){
        this.viewCtrl.showView(ViewID.UIBattleView);
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
        this.viewCtrl.removeSelf();
    }

    @RegisterEvent(NetMessage.StartBattleError)
    private startBattleError(output:StartBattleOutput, input:StartBattleInput){

    }
}