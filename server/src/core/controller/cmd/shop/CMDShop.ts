import { CMDController, Command } from "../CMDController";
import { ShopChecker } from "./ShopChecker";
import { ShopHandle } from "./ShopHandle";

export class CMDShop extends CMDController implements IShopCtrl {
    @Command
    buyGoods(data: IBuyGoodsInput): void {
        const { user } = this;
        const errorCode = ShopChecker.checkItemPurchasable(user, data.id, data.count);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = ShopHandle.buyGoods(user, data.id, data.count);
        this.response<IBuyGoodsOutput>(data.cmd, { rewards });
    }
}