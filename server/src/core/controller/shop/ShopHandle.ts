import { cfgMgr } from "../../config/CfgManager";
import { Goods } from "../../userdata/Goods";
import { ItemHandle } from "../item/ItemHandle";
import { ItemHelper } from "../item/ItemHelper";

export class ShopHandle {

    /** 购买物品 */
    static buyGoods(data: IUser, id: number, count: number) {
        const item = cfgMgr.Shop[ id ];
        item.sellPrice.forEach(v => ItemHandle.changeItemCount(data, v.id, -v.count * count));
        if (ItemHelper.isEquip(item.sellID)) data.bag.addNewEquip(item.sellID, count);
        else ItemHandle.changeItemCount(data, item.sellID, count);
        return [ new Goods(item.sellID, count) ];
    }
}