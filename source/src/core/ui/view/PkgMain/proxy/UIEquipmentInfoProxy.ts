import { GameUtil } from "../../../../common/GameUtil";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { UIEquipmentInfoCtrl } from "../controller/UIEquipmentInfoCtrl";

export class UIEquipmentInfoProxy extends BaseProxy<UIEquipmentInfoCtrl> {
    @RegisterEvent(NetCMD.SellEquip)
    private sellEquip(output: ISellEquipOutput, input: ISellEquipInput) {
        this.viewCtrl.removeSelf();
        if (output.rewards?.length) {
            GameUtil.ShowRewardsTip(`出售${ GameUtil.GetItemCountStr(input.id) }获得`, output.rewards);
        }
    }

    @RegisterEvent(NetCMD.DressEquip)
    private dressEquip(output: IDressEquipOutput, input: IDressEquipInput) {
        this.viewCtrl.removeSelf();
    }
}