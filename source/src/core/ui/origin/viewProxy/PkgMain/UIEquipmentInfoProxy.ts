import { GameUtil } from "../../../common/GameUtil";
import { NetMessage } from "../../../net/enum/NetMessage";
import { BaseProxy } from "../../core/BaseProxy";
import { tipMgr } from "../../tool/TipManager";
import { UIEquipmentInfoMsg } from "../../view/PkgMain/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../../viewCtrl/PkgMain/UIEquipmentInfoCtrl";

export class UIEquipmentInfoProxy extends BaseProxy<UIEquipmentInfoCtrl>{
    @RegisterEvent(NetMessage.DressEquip)
    private dressEquipResponse() {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
    }

    @RegisterEvent(NetMessage.SellEquip)
    private sellEquipResponse(outPut: SellEquipOutput & SellEquipInput) {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => tipMgr.showTip(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }
}