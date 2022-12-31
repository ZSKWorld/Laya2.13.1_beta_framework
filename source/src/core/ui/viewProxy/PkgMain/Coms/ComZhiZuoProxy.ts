import { GameUtil } from "../../../../common/GameUtil";
import { InsertEvent } from "../../../../libs/event/EventMgr";
import { NetResponse } from "../../../../net/NetResponse";
import { BaseProxy } from "../../../core/BaseProxy";
import { UIUtility } from "../../../tool/UIUtility";
import { ComZhiZuoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComZhiZuoCtrl";

export class ComZhiZuoProxy extends BaseProxy<ComZhiZuoCtrl>{
    @InsertEvent(NetResponse.Response_DecomposeEquip)
    private decomposeEquipResponse(outPut: DecomposeEquipOutput) {
        UIUtility.showTipInfo(GameUtil.getLang(1022));
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }
}