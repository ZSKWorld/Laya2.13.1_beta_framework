import { AddCMD, Controller } from "../Controller";
import { ShopChecker } from "./ShopChecker";
import { ShopHandle } from "./ShopHandle";

export class ShopController extends Controller implements IShopCtrl {
    @AddCMD
    buyGoods(data: BuyGoodsInput): void {
        const { user } = this;
        const errorCode = ShopChecker.checkItemPurchasable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = ShopHandle.buyGoods(user, data.id, data.count);
            this.response<BuyGoodsOutput>(data.cmd, { rewards });
        }
    }
}