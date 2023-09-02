import { cfgMgr } from "../../config/CfgManager";
import { Goods } from "../../userdata/Goods";
import { BagHandle } from "../bag/BagHandle";
import { BagHelper } from "../bag/BagHelper";

export class ShopHandle {

    /** 购买物品 */
    static buyGoods(data: IUser, id: number, count: number) {
        const item = cfgMgr.Shop[ id ];
        item.sellPrice.forEach(v => BagHandle.changeItemCount(data, v.id, -v.count * count));
        if (BagHelper.isEquip(item.sellID)) data.bag.addNewEquip(item.sellID, count);
        else BagHandle.changeItemCount(data, item.sellID, count);
        return [ new Goods(item.sellID, count) ];
    }
}