import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseNetProcessor } from "../../core/BaseNetProcessor";
import { UISettingCtrl } from "../../viewCtrl/PkgMain/UISettingCtrl";

export class UISettingNetProcessor extends BaseNetProcessor<UISettingCtrl>{
    @InsertEvent(NetResponse.Response_ClearAccount)
    private clearAccountResponse() {
        this.viewCtrl.removeTopView();
    }
}