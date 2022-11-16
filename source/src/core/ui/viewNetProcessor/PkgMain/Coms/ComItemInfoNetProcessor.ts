import { GameEvent } from "../../../../common/GameEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { InsertEvent } from "../../../../libs/event/EventMgr";
import { NetResponse } from "../../../../net/NetResponse";
import { BaseNetProcessor } from "../../../core/BaseNetProcessor";
import { RichStrMgr } from "../../../tool/RichStrMgr";
import { UIUtility } from "../../../tool/UIUtility";
import { ComItemInfoMsg } from "../../../view/PkgMain/Coms/ComItemInfoView";
import { ComItemInfoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";

export class ComItemInfoNetProcessor extends BaseNetProcessor<ComItemInfoCtrl>{

    @InsertEvent(NetResponse.Response_UseItem)
    private useItemResponse(outPut: UseItemOutput & UseItemInput) {
        this.sendMessage(ComItemInfoMsg.OnBtnBgClick);
        let logStr = RichStrMgr.start(`使用${ GameUtil.getItemCountStr(outPut) }获得`).break();
        outPut.rewards?.forEach(v => {
            const str = GameUtil.getItemCountStr(v);
            UIUtility.showTipInfo(`恭喜获得${ str }`);
            logStr.combineBreak(str);
        });
        this.dispatch(GameEvent.AddExperienceLog, logStr.end());
    }

    @InsertEvent(NetResponse.Response_SellItem)
    private sellItemResponse(outPut: SellItemOutput & SellItemInput) {
        this.sendMessage(ComItemInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }

    @InsertEvent(NetResponse.Response_BuyGoods)
    private buyGoodsResponse(outPut: BuyGoodsOutput & BuyGoodsInput) {
        this.sendMessage(ComItemInfoMsg.OnBtnBgClick);
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }

    @InsertEvent(NetResponse.Response_ChangeCollect)
    private changeCollectResponse() {
        this.viewCtrl.refreshContent();
    }
}