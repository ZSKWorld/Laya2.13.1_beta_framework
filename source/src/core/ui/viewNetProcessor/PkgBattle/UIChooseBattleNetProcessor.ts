import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseNetProcessor } from "../../core/BaseNetProcessor";
import { ViewID } from "../../core/ViewID";
import { UIChooseBattleCtrl } from "../../viewCtrl/PkgBattle/UIChooseBattleCtrl";

export class UIChooseBattleNetProcessor extends BaseNetProcessor<UIChooseBattleCtrl>{
    @InsertEvent(NetResponse.Response_StartBattle)
    private startBattleResponse(){
        this.viewCtrl.addView(ViewID.BattleView);
    }
}