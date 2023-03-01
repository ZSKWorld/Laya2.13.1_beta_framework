import { AddCMD, BaseController } from "../base/BaseController";
import { EquipmentChecker } from "./EquipmentChecker";
import { EquipmentHandle } from "./EquipmentHandle";

export class EquipmentController extends BaseController implements IEquipmentCtrl {

    @AddCMD
    dressEquip(data: DressEquipInput): void {
        const { user } = this;
        const errorCode = EquipmentChecker.checkEquipDressable(user, data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            EquipmentHandle.dressEquip(user, data.uid);
            this.response(data.cmd);
        }
    }

    @AddCMD
    takeOffEquip(data: TakeOffEquipInput): void {
        const { user } = this;
        const errorCode = EquipmentChecker.checkEquipTakeOff(user, data.part);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            EquipmentHandle.takeOffEquip(user, data.part);
            this.response(data.cmd);
        }
    }

    @AddCMD
    sellEquip(data: SellEquipInput): void {
        const { user } = this;
        const errorCode = EquipmentChecker.checkEquipSalable(user, data.uid);
        if (errorCode) this.response(data.cmd, null, errorCode);
        else {
            const rewards = EquipmentHandle.sellEquip(user, data.uid);
            this.response<SellEquipOutput>(data.cmd, { rewards });
        }
    }

    @AddCMD
    decomposeEquip(data: DecomposeEquipInput): void {
        const rewards = EquipmentHandle.decomposeEquipByStar(this.user, data.star);
        this.response<DecomposeEquipOutput>(data.cmd, { rewards });
    }
}