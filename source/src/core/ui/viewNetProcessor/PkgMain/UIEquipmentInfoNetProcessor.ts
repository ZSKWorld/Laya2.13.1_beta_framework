import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseNetProcessor } from "../../core/BaseNetProcessor";
import { UIEquipmentInfoMsg } from "../../view/PkgMain/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../../viewCtrl/PkgMain/UIEquipmentInfoCtrl";

export class UIEquipmentInfoNetProcessor extends BaseNetProcessor<UIEquipmentInfoCtrl>{
    @InsertEvent(NetResponse.Response_DressEquip)
    @InsertEvent(NetResponse.Response_SellEquip)
    private dressEquipResponse() {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
    }
}