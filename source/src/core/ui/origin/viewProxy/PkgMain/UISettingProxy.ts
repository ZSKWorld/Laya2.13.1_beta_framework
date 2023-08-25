import { Event } from "../../../libs/event/EventManager";
import { NetMessage } from "../../../net/enum/NetMessage";
import { BaseProxy } from "../../core/BaseProxy";
import { UISettingCtrl } from "../../viewCtrl/PkgMain/UISettingCtrl";

export class UISettingProxy extends BaseProxy<UISettingCtrl>{
    @Event(NetMessage.ClearAccount)
    private clearAccountResponse() {
        this.viewCtrl.removeTopView();
    }
}