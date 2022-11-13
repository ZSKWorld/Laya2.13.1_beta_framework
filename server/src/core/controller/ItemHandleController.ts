import { AddCMD, BaseController } from "./BaseController";

export class ItemHandleController extends BaseController implements IItemHandle {
    @AddCMD
    useItem(data: UseItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkUseItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.useItem(data.id, data.count);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    sellItem(data: SellItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.sellItem(data.id, data.count);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    dressEquip(data: DressEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkDressEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.dressEquip(data.uid);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    takeOffEquip(data: TakeOffEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkTakeOffEquip(data.part);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.takeOffEquip(data.part);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    sellEquip(data: SellEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.sellEquip(data.uid);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    changeCollect(data: ChangeCollectPinInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkCollect(data.id, data.collect);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.changeCollect(data.id, data.collect);
            this.response(data.cmd, { syncInfo });
        }
    }

    @AddCMD
    decomposeEquip(data: DecomposeEquipInput): void {
        const syncInfo = this.connection.userData.decomposeEquip(data.star);
        this.response(data.cmd, { syncInfo });
    }

}