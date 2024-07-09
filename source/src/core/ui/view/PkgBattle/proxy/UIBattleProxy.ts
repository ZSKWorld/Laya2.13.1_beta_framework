import { NetCMD } from "../../../../net/enum/NetCMD";
import { SocketEvent } from "../../../../net/WebSocket";
import { BaseProxy } from "../../../core/BaseProxy";
import { UIBattleCtrl } from "../controller/UIBattleCtrl";

export class UIBattleProxy extends BaseProxy<UIBattleCtrl> {
	@RegisterEvent(SocketEvent.Close)
    @RegisterEvent(NetCMD.ExitBattle)
    private existBattle(output: IExitBattleOutput, input: IExitBattleInput) {
        this.viewCtrl.showView(ViewID.UIChooseBattleView);
        this.viewCtrl.removeSelf();
    }
}