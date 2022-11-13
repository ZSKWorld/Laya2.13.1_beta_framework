import { GameUtil } from "../../../../common/GameUtil";
import { InsertEvent } from "../../../../libs/event/EventMgr";
import { NetResponse } from "../../../../net/NetResponse";
import { BaseNetProcessor } from "../../../core/BaseNetProcessor";
import { UIUtility } from "../../../tool/UIUtility";
import { ComZhiZuoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComZhiZuoCtrl";

export class ComZhiZuoNetProcessor extends BaseNetProcessor<ComZhiZuoCtrl>{
    @InsertEvent(NetResponse.Response_DecomposeEquip)
    private decomposeEquipResponse() {
        UIUtility.showTipInfo(GameUtil.getLang(1022));
    }
}