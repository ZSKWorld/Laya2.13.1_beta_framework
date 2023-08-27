import { GameEvent } from "../../../../common/GameEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { richStrMgr } from "../../../tool/RichStrManager";
import { tipMgr } from "../../../tool/TipManager";
import { UIGoodsInfoCtrl } from "../controller/UIGoodsInfoCtrl";

export class UIGoodsInfoProxy extends BaseProxy<UIGoodsInfoCtrl>{
    @RegisterEvent(NetMessage.UseItem)
    private onUseItem(output: UseItemOutput, input: UseItemInput) {
        if (input.id == 2010) {
            this.viewCtrl.showView(ViewID.UISectView);
        } else {
            let logStr = richStrMgr.start(`使用${ GameUtil.GetItemCountStr(input) }获得`).break();
            output.rewards?.forEach(v => {
                const str = GameUtil.GetItemCountStr(v);
                tipMgr.showTip(`恭喜获得${ str }`);
                logStr.combineBreak(str);
            });
            this.dispatch(GameEvent.AddExperienceLog, logStr.end());
        }
        this.viewCtrl.removeSelf();
    }

    @RegisterEvent(NetMessage.SellItem)
    private sellItemResponse(outPut: SellItemOutput & SellItemInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => tipMgr.showTip(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }

    @RegisterEvent(NetMessage.BuyGoods)
    private buyGoodsResponse(outPut: BuyGoodsOutput & BuyGoodsInput) {
        this.viewCtrl.removeSelf();
        outPut.rewards?.forEach(v => tipMgr.showTip(`恭喜获得${ GameUtil.GetItemCountStr(v) }`));
    }

    @RegisterEvent(NetMessage.ChangeCollect)
    private changeCollectResponse() {
        this.viewCtrl.refreshContent();
    }
}