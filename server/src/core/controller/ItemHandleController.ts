import { BaseController } from "./BaseController";

export class ItemHandleController extends BaseController implements IItemHandle {
    useItem(data: UseItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkUseItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.useItem(data.id, data.count);
            this.response(data.cmd, { syncInfo });
        }
    }

    sellItem(data: SellItemInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellItem(data.id, data.count);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.sellItem(data.id, data.count);
            this.response(data.cmd, { syncInfo });
        }
    }

    dressEquip(data: DressEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkDressEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.dressEquip(data.uid);
            this.response(data.cmd, { syncInfo });
        }
    }

    takeOffEquip(data: TakeOffEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkTakeOffEquip(data.part);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.takeOffEquip(data.part);
            this.response(data.cmd, { syncInfo });
        }
    }

    sellEquip(data: SellEquipInput): void {
        const userData = this.connection.userData;
        const errorCode = userData.checkSellEquip(data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const syncInfo = userData.sellEquip(data.uid);
            this.response(data.cmd, { syncInfo });
        }
    }

}