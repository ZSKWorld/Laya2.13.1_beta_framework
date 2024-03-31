import { BattleType } from "../../../../net/enum/BattleEnums";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIChooseBattleCtrl } from "../controller/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl> {

    @RegisterEvent(NetCMD.EnterBattle)
    private enterBattle(output: IEnterBattleOutput, input: IEnterBattleInput) {
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
        if (input.type != BattleType.Gather) {
            this.viewCtrl.removeSelf();
            this.viewCtrl.showView(ViewID.UIBattleView);
        }
    }

    @RegisterEvent(NetCMD.EnterBattleError)
    private enterBattleError(output: IEnterBattleOutput, input: IEnterBattleInput) {

    }

    @RegisterEvent(NetCMD.StartGather)
    private startGather() {
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
    }
}