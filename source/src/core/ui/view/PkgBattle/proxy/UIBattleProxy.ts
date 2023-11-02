import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIBattleCtrl } from "../controller/UIBattleCtrl";

export class UIBattleProxy extends BaseProxy<UIBattleCtrl>{
    @RegisterEvent(NetMessage.ExitBattle)
    private existBattle(output: ExitBattleOutput, input: ExitBattleInput) {
        this.viewCtrl.showView(ViewID.UIChooseBattleView);
        this.viewCtrl.removeSelf();
    }
}