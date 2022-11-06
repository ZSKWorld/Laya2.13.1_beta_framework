import { ErrorCode } from "../enum/ErrorCode";
import { ItemUtil } from "../userdata/ItemUtil";
import { BaseController } from "./BaseController";

export class ItemHandleController extends BaseController implements IItemHandle {
    useItem(data: UseItemInput): void {
        const item = ItemUtil.getItem(this.connection.userData.bag, data.id);
        if (item == null) this.response(data.cmd, null, ErrorCode.ITEM_NOT_EXIST);
        else if (item.count < data.count) this.response(data.cmd, null, ErrorCode.ITEM_COUNT_NOT_ENOUGH);
        else {
            //todo
        }
    }
    sellItem(data: SellItemInput): void {
        const item = ItemUtil.getItem(this.connection.userData.bag, data.id);
        if (item == null) this.response(data.cmd, null, ErrorCode.ITEM_NOT_EXIST);
        else if (item.count < data.count) this.response(data.cmd, null, ErrorCode.ITEM_COUNT_NOT_ENOUGH);
        else {
            //todo
        }
    }
    dressEquip(data: DressEquipInput): void {
        const userData = this.connection.userData;
        const equip = ItemUtil.getEquip(userData.bag, data.uid);
        if (equip == null) this.response(data.cmd, null, ErrorCode.ITEM_NOT_EXIST);
        else {
            ItemUtil.dressEquip(userData, data.uid);
            const partName = ItemUtil.getEqupPartName(equip);
            const syncInfo = { bag: userData.bag };
            syncInfo[ partName ] = userData[ partName ];
            this.response(data.cmd, { syncInfo });
        }
    }
    takeOffEquip(data: TakeOffEquipInput): void {
        const userData = this.connection.userData;
        let equip: IEquipment = ItemUtil.getDressedEquip(userData, data.part);
        if (equip != null) {
            ItemUtil.takeOffEquip(userData, data.part);
            const partName = ItemUtil.getEqupPartName(equip);
            const syncInfo = { bag: userData.bag };
            syncInfo[ partName ] = userData[ partName ];
            this.response(data.cmd, { syncInfo });
        }
        else this.response(data.cmd, null, ErrorCode.PART_NOT_DRESSED_EQUIP);
    }
    sellEquip(data: SellEquipInput): void {
        const equip = ItemUtil.getEquip(this.connection.userData.bag, data.uid);
    }

}