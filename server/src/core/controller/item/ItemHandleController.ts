import { AddCMD, BaseController } from "../base/BaseController";
import { ItemHandleChecker } from "./ItemHandleChecker";

export class ItemHandleController extends BaseController implements IItemHandleCtrl {
    @AddCMD
    useItem(data: UseItemInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkItemUsable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = user.useItem(data.id, data.count);
            this.response<UseItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    sellItem(data: SellItemInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkItemSalable(user, data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = user.sellItem(data.id, data.count);
            this.response<SellItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    dressEquip(data: DressEquipInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkEquipWearable(user, data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            user.dressEquip(data.uid);
            this.response(data.cmd);
        }
    }

    @AddCMD
    takeOffEquip(data: TakeOffEquipInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkEquipTakeOff(user, data.part);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            user.takeOffEquip(data.part);
            this.response(data.cmd);
        }
    }

    @AddCMD
    sellEquip(data: SellEquipInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkEquipSalable(user, data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = user.sellEquip(data.uid);
            this.response<SellEquipOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    changeCollect(data: ChangeCollectInput): void {
        const { user } = this;
        const errorCode = ItemHandleChecker.checkCollect(user, data.id, data.collect);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            user.bag.changeItemCollect(data.id, data.collect);
            this.response(data.cmd);
        }
    }

    @AddCMD
    decomposeEquip(data: DecomposeEquipInput): void {
        const { user } = this;
        const rewards = user.decomposeEquip(data.star);
        this.response<DecomposeEquipOutput>(data.cmd, { rewards });
    }

}