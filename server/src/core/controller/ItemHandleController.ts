import { AddCMD, BaseController } from "./BaseController";

export class ItemHandleController extends BaseController implements IItemHandle {
    @AddCMD
    useItem(data: UseItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkUseItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = userData.useItem(data.id, data.count);
            this.response<UseItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    sellItem(data: SellItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = userData.sellItem(data.id, data.count);
            this.response<SellItemOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    dressEquip(data: DressEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkDressEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            userData.dressEquip(data.uid);
            this.response(data.cmd);
        }
    }

    @AddCMD
    takeOffEquip(data: TakeOffEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkTakeOffEquip(data.part);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            userData.takeOffEquip(data.part);
            this.response(data.cmd);
        }
    }

    @AddCMD
    sellEquip(data: SellEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = userData.sellEquip(data.uid);
            this.response<SellEquipOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    changeCollect(data: ChangeCollectPinInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkCollect(data.id, data.collect);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            userData.changeCollect(data.id, data.collect);
            this.response(data.cmd);
        }
    }

    @AddCMD
    decomposeEquip(data: DecomposeEquipInput): void {
        const userData = this.connection.userData;
        const rewards = userData.decomposeEquip(data.star);
        this.response<DecomposeEquipOutput>(data.cmd, { rewards });
    }

}