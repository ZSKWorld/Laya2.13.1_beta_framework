import { GameUtil } from "../../../common/GameUtil";
import { Event } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseProxy } from "../../core/BaseProxy";
import { UIUtility } from "../../tool/UIUtility";
import { UIEquipmentInfoMsg } from "../../view/PkgMain/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../../viewCtrl/PkgMain/UIEquipmentInfoCtrl";

export class UIEquipmentInfoProxy extends BaseProxy<UIEquipmentInfoCtrl>{
    @Event(NetResponse.Response_DressEquip)
    private dressEquipResponse() {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
    }

    @Event(NetResponse.Response_SellEquip)
    private sellEquipResponse(outPut: SellEquipOutput & SellEquipInput) {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }
}