import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseProxy } from "../../core/BaseProxy";
import { UISettingCtrl } from "../../viewCtrl/PkgMain/UISettingCtrl";

export class UISettingProxy extends BaseProxy<UISettingCtrl>{
    @InsertEvent(NetResponse.Response_ClearAccount)
    private clearAccountResponse() {
        this.viewCtrl.removeTopView();
    }
}