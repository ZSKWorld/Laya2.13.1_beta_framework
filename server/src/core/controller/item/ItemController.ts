import { AddCMD, BaseController } from "../BaseController";
import { ItemChecker } from "./ItemChecker";
import { ItemHandle } from "./ItemHandle";

export class ItemController extends BaseController implements IItemHandleCtrl {
    @AddCMD
    useItem(data: UseItemInput): void {
        const { user } = this;
        const errorCode = ItemChecker.checkItemUsable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = ItemHandle.useItem(user, data.id, data.count);
            this.response<UseItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    sellItem(data: SellItemInput): void {
        const { user } = this;
        const errorCode = ItemChecker.checkItemSalable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = ItemHandle.sellItem(user, data.id, data.count);
            this.response<SellItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    changeCollect(data: ChangeCollectInput): void {
        const { user } = this;
        const errorCode = ItemChecker.checkCollect(user, data.id, data.collect);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            user.bag.changeItemCollect(data.id, data.collect);
            this.response(data.cmd);
        }
    }

}