import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseProxy } from "../../core/BaseProxy";
import { ViewID } from "../../core/ViewID";
import { UIChooseBattleCtrl } from "../../viewCtrl/PkgBattle/UIChooseBattleCtrl";

export class UIChooseBattleProxy extends BaseProxy<UIChooseBattleCtrl>{
    @InsertEvent(NetResponse.Response_StartBattle)
    private startBattleResponse() {
        this.viewCtrl.addView(ViewID.BattleView);
    }
}