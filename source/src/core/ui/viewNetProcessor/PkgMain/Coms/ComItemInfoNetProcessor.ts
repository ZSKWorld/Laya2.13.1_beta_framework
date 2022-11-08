import { InsertEvent } from "../../../../libs/event/EventMgr";
import { NetResponse } from "../../../../net/NetResponse";
import { BaseNetProcessor } from "../../../core/BaseNetProcessor";
import { ComItemInfoMsg } from "../../../view/PkgMain/Coms/ComItemInfoView";
import { ComItemInfoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";

export class ComItemInfoNetProcessor extends BaseNetProcessor<ComItemInfoCtrl>{

    @InsertEvent(NetResponse.Response_UseItem)
    private useItemResponse() {
        this.sendMessage(ComItemInfoMsg.OnBtnBgClick);
    }

    @InsertEvent(NetResponse.Response_BuyGoods)
    private buyGoodsResponse() {
        this.sendMessage(ComItemInfoMsg.OnBtnBgClick);
    }

    @InsertEvent(NetResponse.Response_ChangeCollect)
    private changeCollectResponse() {
        this.viewCtrl.refreshContent();
    }
}