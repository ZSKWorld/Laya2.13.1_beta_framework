import { GameUtil } from "../../../common/GameUtil";
import { Event } from "../../../libs/event/EventManager";
import { NetMessage } from "../../../net/enum/NetMessage";
import { BaseProxy } from "../../core/BaseProxy";
import { UIUtility } from "../../tool/UIUtility";
import { UIEquipmentInfoMsg } from "../../view/PkgMain/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../../viewCtrl/PkgMain/UIEquipmentInfoCtrl";

export class UIEquipmentInfoProxy extends BaseProxy<UIEquipmentInfoCtrl>{
    @Event(NetMessage.DressEquip)
    private dressEquipResponse() {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
    }

    @Event(NetMessage.SellEquip)
    private sellEquipResponse(outPut: SellEquipOutput & SellEquipInput) {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => UIUtility.ShowTipInfo(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }
}