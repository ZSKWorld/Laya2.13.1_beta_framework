import { BattleType } from "../../../../net/enum/BattleEnums";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIChooseBattleCtrl } from "../controller/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl> {

    @RegisterEvent(NetMessage.EnterBattle)
    private enterBattle(output: IEnterBattleOutput, input: IEnterBattleInput) {
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
        if (input.type != BattleType.Gather) {
            this.viewCtrl.removeSelf();
            this.viewCtrl.showView(ViewID.UIBattleView);
        }
    }

    @RegisterEvent(NetMessage.EnterBattleError)
    private enterBattleError(output: IEnterBattleOutput, input: IEnterBattleInput) {

    }

    @RegisterEvent(NetMessage.StartGather)
    private startGather() {
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
    }
}