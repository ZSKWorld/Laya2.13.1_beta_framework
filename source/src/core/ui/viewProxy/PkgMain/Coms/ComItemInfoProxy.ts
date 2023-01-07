import { GameEvent } from "../../../../common/GameEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { Event } from "../../../../libs/event/EventMgr";
import { NetResponse } from "../../../../net/NetResponse";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { RichStrMgr } from "../../../tool/RichStrMgr";
import { UIUtility } from "../../../tool/UIUtility";
import { ComItemInfoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";

export class ComItemInfoProxy extends BaseProxy<ComItemInfoCtrl>{

    @Event(NetResponse.Response_UseItem)
    private useItemResponse(outPut: UseItemOutput & UseItemInput) {
        if (outPut.id == 2010) {
            this.viewCtrl.addView(ViewID.SectView, null, null, false);
        } else {
            let logStr = RichStrMgr.start(`使用${ GameUtil.getItemCountStr(outPut) }获得`).break();
            outPut.rewards?.forEach(v => {
                const str = GameUtil.getItemCountStr(v);
                UIUtility.showTipInfo(`恭喜获得${ str }`);
                logStr.combineBreak(str);
            });
            this.dispatch(GameEvent.AddExperienceLog, logStr.end());
        }
        this.viewCtrl.removeSelf();
    }

    @Event(NetResponse.Response_SellItem)
    private sellItemResponse(outPut: SellItemOutput & SellItemInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }

    @Event(NetResponse.Response_BuyGoods)
    private buyGoodsResponse(outPut: BuyGoodsOutput & BuyGoodsInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => UIUtility.showTipInfo(`恭喜获得${ GameUtil.getItemCountStr(v) }`));
    }

    @Event(NetResponse.Response_ChangeCollect)
    private changeCollectResponse() {
        this.viewCtrl.refreshContent();
    }
}