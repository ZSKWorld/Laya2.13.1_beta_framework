import { AddCMD, BaseController } from "../base/BaseController";
import { ItemHandleChecker } from "../item/ItemHandleChecker";

export class ShopController extends BaseController implements IShop {
    @AddCMD
    buyGoods(data: BuyGoodsInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkItemPurchasable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = user.buyGoods(data.id, data.count);
            this.response<BuyGoodsOutput>(data.cmd, { rewards });
        }
    }
}