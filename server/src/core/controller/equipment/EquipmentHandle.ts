import { EquipmentPart } from "../../enum/ItemEnum";
import { ItemHandle } from "../item/ItemHandle";

export class EquipmentHandle {

    /** 穿戴装备 */
    static dressEquip(data: IUser, uid: string) {
        const { bag, body } = data;
        const equip = bag.removeEquip(uid);
        const dressedEquip = body.getDressedEquip(equip.part);
        bag.addEquip(dressedEquip);
        body.setDressedEquip(equip.part, equip);
    }

    /** 脱下装备 */
    static takeOffEquip(data: IUser, part: EquipmentPart) {
        const { bag, body } = data;
        const equip = body.getDressedEquip(part);
        body.setDressedEquip(part, null);
        bag.addEquip(equip);
    }

    /** 出售装备 */
    static sellEquip(data: IUser, uid: string) {
        const equip = data.bag.getEquip(uid);
        data.bag.removeEquip(uid);
        return ItemHandle.sellItem(data, equip.id, 1);
    }


    /** 按星级分解装备 */
    static decomposeEquipByStar(data: IUser, star: number) {
        const equips = data.bag.equipment;
        const equipCnt = equips.length;
        let rewards: IGoods[] = [];
        for (let i = equipCnt - 1; i >= 0; i--) {
            if (equips[ i ].star == star) {
                rewards = rewards.concat(ItemHandle.sellItem(data, equips[ i ].id, 1));
                equips.splice(i, 1);
            }
        }
        return rewards;
    }
}