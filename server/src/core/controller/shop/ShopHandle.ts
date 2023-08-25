import { ItemBase } from "../../data/ItemBase";
import { ItemHandle } from "../item/ItemHandle";
import { ItemHelper } from "../item/ItemHelper";

export class ShopHandle {

    /** 购买物品 */
    static buyGoods(data: IUser, id: number, count: number) {
        const item = cfgMgr.Shop[ id ];
        item.SellPrice.forEach(v => ItemHandle.changeItemCount(data, v.id, -v.count * count));
        if (ItemHelper.isEquip(item.SellID)) data.bag.addNewEquip(item.SellID, count);
        else ItemHandle.changeItemCount(data, item.SellID, count);
        return [ new ItemBase(item.SellID, count) ];
    }
}