import { GameUtil } from "../../../../common/GameUtil";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { richTextMgr } from "../../../tool/RichStrManager";
import { UIUtil } from "../../../tool/UIUtil";
import { UIGoodsInfoCtrl } from "../controller/UIGoodsInfoCtrl";

export class UIGoodsInfoProxy extends BaseProxy<UIGoodsInfoCtrl> {
    @RegisterEvent(NetCMD.UseItem)
    private useItem(output: IUseItemOutput, input: IUseItemInput) {
        if (input.id == 2010)
            this.viewCtrl.showView(ViewID.UISectView);
        else
            UIUtil.showRewardsTip(`使用${ GameUtil.getItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetCMD.SellItem)
    private sellItem(output: ISellItemOutput, input: ISellItemInput) {
        UIUtil.showRewardsTip(`出售${ GameUtil.getItemCountStr(input.id, input.count) }获得`, output.rewards);
    }

    @RegisterEvent(NetCMD.BuyGoods)
    private buyGoods(output: IBuyGoodsOutput, input: IBuyGoodsInput) {
        let titleStr = richTextMgr.start("消耗");
        const item = cfgMgr.Shop[input.id];
        item.sellPrice.forEach(v => titleStr.append(GameUtil.getItemCountStr(v.id, v.count * input.count)));
        titleStr.append("购买");
        UIUtil.showRewardsTip(titleStr.end(), output.rewards);
    }

    @RegisterEvent(NetCMD.ChangeCollect)
    private changeCollect() {
        this.viewCtrl.refreshContent();
    }
}