import { GameUtil } from "../../../common/GameUtil";
import { InsertEvent } from "../../../libs/event/EventMgr";
import { NetResponse } from "../../../net/NetResponse";
import { BaseNetProcessor } from "../../core/BaseNetProcessor";
import { UIUtility } from "../../tool/UIUtility";
import { UIEquipmentInfoMsg } from "../../view/PkgMain/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../../viewCtrl/PkgMain/UIEquipmentInfoCtrl";

export class UIEquipmentInfoNetProcessor extends BaseNetProcessor<UIEquipmentInfoCtrl>{
    @InsertEvent(NetResponse.Response_DressEquip)
    private dressEquipResponse() {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
    }

    @InsertEvent(NetResponse.Response_SellEquip)
    private sellEquipResponse(outPut: SellEquipOutput & SellEquipInput) {
        this.sendMessage(UIEquipmentInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }
}