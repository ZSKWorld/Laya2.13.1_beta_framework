import { EquipmentPart, ItemBagType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";

export class ItemUtil {
    private static EquipMap: { [ key in EquipmentPart ]: string } = {
        1: "weapon",
        2: "helmet",
        3: "necklace",
        4: "clothes",
        5: "ring",
        6: "trousers",
        7: "amulet",
        8: "shoes",
        9: "mount",
        10: "fashion",
        11: "hiddenWeeapon",
        12: "magicWeapon"
    };
    static checkJingJieEnough(data: IUserData, checkJingJie: number, checkCengJi: number) {
        return data.jingJie > checkJingJie || (data.jingJie == checkJingJie && data.cengJi >= checkCengJi);
    }

    /** 获取背包物品 */
    static getItem(bag: IBag, id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        let datas: ItemBase[];
        switch (item.BagType) {
            // case ItemBagType.ShouCang: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = bag.prop; break;
            case ItemBagType.Gem: datas = bag.gem; break;
            case ItemBagType.Material: datas = bag.material; break;
            case ItemBagType.SkillBook: datas = bag.skillBook; break;
            case ItemBagType.Other: datas = bag.other; break;
        }
        if (datas) return datas.find(v => v.id = id);
        else return null;
    }

    static getEqupPartName(equip: IEquipment): string;
    static getEqupPartName(part: EquipmentPart): string;
    static getEqupPartName(param: any) {
        if (typeof param == "number") return this.EquipMap[ param ];
        else return this.EquipMap[ tableMgr.Equipment[ param ].Part ];
    }

    /** 获取背包里的装备 */
    static getEquip(bag: IBag, uid: string) {
        return bag.equipment.find(v => v.uid == uid);
    }

    /** 获取已穿戴的装备 */
    static getDressedEquip(data: IUserData, part: EquipmentPart) {
        return data[ this.EquipMap[ part ] ];
    }

    static dressEquip(data: IUserData, uid: string) {
        const equip = this.getEquip(data.bag, uid);
        if (equip) {
            data.bag.equipment.remove(equip);
            const part = tableMgr.Equipment[ equip.id ].Part;
            const dressedEquip = data[ this.EquipMap[ part ] ];
            if (dressedEquip) data.bag.equipment.push(dressedEquip);
            data[ this.EquipMap[ part ] ] = equip;
        }
    }

    static takeOffEquip(data: IUserData, part: EquipmentPart) {
        const equip: IEquipment = data[ this.EquipMap[ part ] ];
        data[ this.EquipMap[ part ] ] = null;
        data.bag.equipment.push(equip);
    }
}