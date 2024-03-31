import { cfgMgr } from "../../../config/CfgManager";
import { ErrorCode } from "../../../enum/ErrorCode";
import { BagHelper } from "../bag/BagHelper";

export class ShopChecker {
    /**
     * 检查物品是否可购买
     * @param data 用户数据
     * @param id 物品id
     * @param count 物品数量
     * @returns
     */
    static checkItemPurchasable(data: IUser, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = cfgMgr.Shop[id];
        if (!item) return ErrorCode.GOODS_NOT_EXIST;
        for (let i = 0, n = item.sellPrice.length; i < n; i++) {
            const element = item.sellPrice[i];
            if (BagHelper.getItemCount(data, element.id) < element.count * count)
                return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        }
        return ErrorCode.NONE;
    }
}