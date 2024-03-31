import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { UIBattleCtrl } from "../controller/UIBattleCtrl";

export class UIBattleProxy extends BaseProxy<UIBattleCtrl> {
    @RegisterEvent(NetCMD.ExitBattle)
    private existBattle(output: IExitBattleOutput, input: IExitBattleInput) {
        this.viewCtrl.showView(ViewID.UIChooseBattleView);
        this.viewCtrl.removeSelf();
    }
}