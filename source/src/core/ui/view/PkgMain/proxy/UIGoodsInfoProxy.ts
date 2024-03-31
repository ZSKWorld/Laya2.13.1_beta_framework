import { GameUtil } from "../../../../common/GameUtil";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { ViewID } from "../../../core/ViewID";
import { richStrMgr } from "../../../tool/RichStrManager";
import { UIGoodsInfoCtrl } from "../controller/UIGoodsInfoCtrl";

export class UIGoodsInfoProxy extends BaseProxy<UIGoodsInfoCtrl> {
    @RegisterEvent(NetCMD.UseItem)
    private useItem(output: IUseItemOutput, input: IUseItemInput) {
        if (input.id == 2010)
            this.viewCtrl.showView(ViewID.UISectView);
        else
            GameUtil.ShowRewardsTip(`使用${ GameUtil.GetItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetCMD.SellItem)
    private sellItem(output: ISellItemOutput, input: ISellItemInput) {
        GameUtil.ShowRewardsTip(`出售${ GameUtil.GetItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetCMD.BuyGoods)
    private buyGoods(output: IBuyGoodsOutput, input: IBuyGoodsInput) {
        let titleStr = richStrMgr.start("消耗");
        const item = cfgMgr.Shop[input.id];
        item.sellPrice.forEach(v => titleStr.combineSpace(GameUtil.GetItemCountStr(v.id, v.count * input.count)));
        titleStr.combineSpace("购买");
        GameUtil.ShowRewardsTip(titleStr.end(), output.rewards);
    }

    @RegisterEvent(NetCMD.ChangeCollect)
    private changeCollect() {
        this.viewCtrl.refreshContent();
    }
}