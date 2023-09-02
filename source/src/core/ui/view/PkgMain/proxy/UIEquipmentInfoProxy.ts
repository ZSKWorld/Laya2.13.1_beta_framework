import { GameEvent } from "../../../../common/GameEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { richStrMgr } from "../../../tool/RichStrManager";
import { tipMgr } from "../../../tool/TipManager";
import { UIEquipmentInfoCtrl } from "../controller/UIEquipmentInfoCtrl";

export class UIEquipmentInfoProxy extends BaseProxy<UIEquipmentInfoCtrl>{
    @RegisterEvent(NetMessage.SellEquip)
    private sellEquip(output: SellEquipOutput, input: SellEquipInput) {
        this.viewCtrl.removeSelf();
        if (output.rewards?.length) {
            GameUtil.ShowRewardsTip(`出售${ GameUtil.GetItemCountStr(input.id) }获得`, output.rewards);
        }
    }

    @RegisterEvent(NetMessage.DressEquip)
    private dressEquip(output: DressEquipOutput, input: DressEquipInput) {
        this.viewCtrl.removeSelf();
    }
}