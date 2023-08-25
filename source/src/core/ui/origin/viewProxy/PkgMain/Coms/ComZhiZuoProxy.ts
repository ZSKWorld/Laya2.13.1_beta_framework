import { GameUtil } from "../../../../common/GameUtil";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { tipMgr } from "../../../tool/TipManager";
import { ComZhiZuoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComZhiZuoCtrl";

export class ComZhiZuoProxy extends BaseProxy<ComZhiZuoCtrl>{
    @RegisterEvent(NetMessage.DecomposeEquip)
    private decomposeEquipResponse(outPut: DecomposeEquipOutput) {
        tipMgr.showTip(GameUtil.GetLang(1022));
        outPut.rewards?.forEach(v => tipMgr.showTip(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }
}