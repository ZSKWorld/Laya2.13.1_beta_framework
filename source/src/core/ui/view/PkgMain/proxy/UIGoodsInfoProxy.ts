import { GameUtil } from "../../../../common/GameUtil";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { richStrMgr } from "../../../tool/RichStrManager";
import { UIGoodsInfoCtrl } from "../controller/UIGoodsInfoCtrl";

export class UIGoodsInfoProxy extends BaseProxy<UIGoodsInfoCtrl> {
    @RegisterEvent(NetMessage.UseItem)
    private useItem(output: IUseItemOutput, input: IUseItemInput) {
        if (input.id == 2010)
            this.viewCtrl.showView(ViewID.UISectView);
        else
            GameUtil.ShowRewardsTip(`使用${ GameUtil.GetItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetMessage.SellItem)
    private sellItem(output: ISellItemOutput, input: ISellItemInput) {
        GameUtil.ShowRewardsTip(`出售${ GameUtil.GetItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetMessage.BuyGoods)
    private buyGoods(output: IBuyGoodsOutput, input: IBuyGoodsInput) {
        let titleStr = richStrMgr.start("消耗");
        const item = cfgMgr.Shop[input.id];
        item.sellPrice.forEach(v => titleStr.combineSpace(GameUtil.GetItemCountStr(v.id, v.count * input.count)));
        titleStr.combineSpace("购买");
        GameUtil.ShowRewardsTip(titleStr.end(), output.rewards);
    }

    @RegisterEvent(NetMessage.ChangeCollect)
    private changeCollect() {
        this.viewCtrl.refreshContent();
    }
}