import { GameEvent } from "../../../../common/GameEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { Event } from "../../../../libs/event/EventManager";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { richStrMgr } from "../../../tool/RichStrManager";
import { UIUtility } from "../../../tool/UIUtility";
import { ComItemInfoCtrl } from "../../../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";

export class ComItemInfoProxy extends BaseProxy<ComItemInfoCtrl>{

    @Event(NetMessage.UseItem)
    private useItemResponse(outPut: UseItemOutput & UseItemInput) {
        if (outPut.id == 2010) {
            this.viewCtrl.addView(ViewID.UISectView, null, null, false);
        } else {
            let logStr = richStrMgr.start(`使用${ GameUtil.GetItemCountStr(outPut) }获得`).break();
            outPut.rewards?.forEach(v => {
                const str = GameUtil.GetItemCountStr(v);
                UIUtility.ShowTipInfo(`恭喜获得${ str }`);
                logStr.combineBreak(str);
            });
            this.dispatch(GameEvent.AddExperienceLog, logStr.end());
        }
        this.viewCtrl.removeSelf();
    }

    @Event(NetMessage.SellItem)
    private sellItemResponse(outPut: SellItemOutput & SellItemInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => UIUtility.ShowTipInfo(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }

    @Event(NetMessage.BuyGoods)
    private buyGoodsResponse(outPut: BuyGoodsOutput & BuyGoodsInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => UIUtility.ShowTipInfo(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }

    @Event(NetMessage.ChangeCollect)
    private changeCollectResponse() {
        this.viewCtrl.refreshContent();
    }
}