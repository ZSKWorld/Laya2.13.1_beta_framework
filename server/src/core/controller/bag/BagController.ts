import { AddCMD, Controller } from "../Controller";
import { BagChecker } from "./BagChecker";
import { BagHandle } from "./BagHandle";

export class BagController extends Controller implements IBagCtrl {
    @AddCMD
    useItem(data: UseItemInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkItemUsable(user, data.id, data.count);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.useItem(user, data.id, data.count);
        this.response<UseItemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    sellItem(data: SellItemInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkItemSalable(user, data.id, data.count);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.sellItem(user, data.id, data.count);
        this.response<SellItemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    changeCollect(data: ChangeCollectInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkCollect(user, data.id, data.collect);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        user.bag.changeItemCollect(data.id, data.collect);
        this.response(data.cmd);
    }

    @AddCMD
    decomposeGem(data: DecomposeGemInput): void {
        const rewards = BagHandle.decomposeGemByLevel(this.user, data.level);
        this.response<DecomposeGemOutput>(data.cmd, { rewards });
    }

    @AddCMD
    dressEquip(data: DressEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipDressable(user, data.uid);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BagHandle.dressEquip(user, data.uid);
        this.response(data.cmd);
    }

    @AddCMD
    takeOffEquip(data: TakeOffEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipTakeOff(user, data.part);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        BagHandle.takeOffEquip(user, data.part);
        this.response(data.cmd);
    }

    @AddCMD
    sellEquip(data: SellEquipInput): void {
        const { user } = this;
        const errorCode = BagChecker.checkEquipSalable(user, data.uid);
        if (errorCode) return this.response(data.cmd, null, errorCode);
        const rewards = BagHandle.sellEquip(user, data.uid);
        this.response<SellEquipOutput>(data.cmd, { rewards });
    }

    @AddCMD
    decomposeEquip(data: DecomposeEquipInput): void {
        const rewards = BagHandle.decomposeEquipByStar(this.user, data.star);
        this.response<DecomposeEquipOutput>(data.cmd, { rewards });
    }

}