import { NetCMD } from "../../../../net/enum/NetCMD";
import { BattleType } from "../../../../userData/const/BattleEnums";
import { BaseProxy } from "../../../core/BaseProxy";
import { UIBattleConfirmCtrl } from "../controller/UIBattleConfirmCtrl";
import { UIBattleData } from "../controller/UIBattleCtrl";

export class UIBattleConfirmProxy extends BaseProxy<UIBattleConfirmCtrl> {

    @RegisterEvent(NetCMD.EnterBattle)
    private enterBattle(output: IEnterBattleOutput, input: IEnterBattleInput) {
        this.viewCtrl.removeView(ViewID.UIBattleConfirmView);
        if (input.type != BattleType.Gather) {
            this.viewCtrl.removeSelf();
            this.viewCtrl.showView<UIBattleData>(ViewID.UIBattleView, input);
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