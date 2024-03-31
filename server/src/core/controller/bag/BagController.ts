import { AddCMD, Controller } from "../Controller";
import { BagChecker } from "./BagChecker";
import { BagHandle } from "./BagHandle";

export class BagController extends Controller implements IBagCtrl {
    @AddCMD
    useItem(data: IUseItemInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkItemUsable(user, data.id, data.count);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.useItem(user, data.id, data.count);
        this.response<IUseItemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    sellItem(data: ISellItemInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkItemSalable(user, data.id, data.count);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.sellItem(user, data.id, data.count);
        this.response<ISellItemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    changeCollect(data: IChangeCollectInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkCollect(user, data.id, data.collect);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        user.bag.changeItemCollect(data.id, data.collect);
        this.response(data.cmd);
    }

    @AddCMD
    decomposeGem(data: IDecomposeGemInput): void {
        const rewards = BagHandle.decomposeGemByLevel(this.user, data.level);
        this.response<IDecomposeGemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    dressEquip(data: IDressEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipDressable(user, data.uid);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BagHandle.dressEquip(user, data.uid);
        this.response(data.cmd);
    }

    @AddCMD
    takeOffEquip(data: ITakeOffEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipTakeOff(user, data.part);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BagHandle.takeOffEquip(user, data.part);
        this.response(data.cmd);
    }

    @AddCMD
    sellEquip(data: ISellEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipSalable(user, data.uid);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.sellEquip(user, data.uid);
        this.response<ISellEquipOutput>(data.cmd, { rewards });
    }

    @AddCMD
    decomposeEquip(data: IDecomposeEquipInput): void {
        const rewards = BagHandle.decomposeEquipByStar(this.user, data.star);
        this.response<IDecomposeEquipOutput>(data.cmd, { rewards });
    }

}