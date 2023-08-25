import { NetMessage } from "../../../net/enum/NetMessage";
import { BaseProxy } from "../../core/BaseProxy";
import { ViewID } from "../../core/ViewID";
import { UIChooseBattleCtrl } from "../../viewCtrl/PkgBattle/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl>{
    @RegisterEvent(NetMessage.StartBattle)
    private startBattleResponse() {
        this.viewCtrl.showView(ViewID.UIBattleView);
    }
}