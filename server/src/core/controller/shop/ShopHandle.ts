import { GameUtil } from "../../../utils/GameUtil";
import { tableMgr } from "../../table/TableManager";
import { ItemBase } from "../../user/ItemBase";
import { ItemHandle } from "../item/ItemHandle";

export class ShopHandle {

    /** 购买物品 */
    static buyGoods(data: IUser, id: number, count: number) {
        const item = tableMgr.Shop[ id ];
        item.SellPrice.forEach(v => ItemHandle.changeItemCount(data, v.id, -v.count * count));
        if (GameUtil.isEquip(item.SellID)) data.bag.addNewEquip(item.SellID, count);
        else ItemHandle.changeItemCount(data, item.SellID, count);
        return [ new ItemBase(item.SellID, count) ];
    }
}