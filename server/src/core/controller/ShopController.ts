import { AddCMD, BaseController } from "./BaseController";

export class ShopController extends BaseController implements IShop {
    @AddCMD
    buyGoods(data: BuyGoodsInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkBuyItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.buyGoods(data.id, data.count);
            this.response(data.cmd, { syncInfo });
        }
    }
}