import { DataType, ItemBagType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { Equipment, ItemBase } from "./Item";

export class Bag implements IBag {
    collect: number[];
    equipment: IEquipment[];
    gem: IItemBase[];
    prop: IItemBase[];
    material: IItemBase[];
    book: IItemBase[];
    other: IItemBase[];

    getItem(id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        let datas: IItemBase[];
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = this.prop; break;
            case ItemBagType.Gem: datas = this.gem; break;
            case ItemBagType.Material: datas = this.material; break;
            case ItemBagType.Book: datas = this.book; break;
            case ItemBagType.Other: datas = this.other; break;
        }
        if (datas) return datas.find(v => v.id == id);
        else return null;
    }

    getEquip(uid: string) {
        return this.equipment.find(v => v.uid == uid);
    }

    changeItemCount(id: number, count: number) {
        const item = tableMgr.Item[ id ];
        if (item.DataType == DataType.BagData) {
            let datas: IItemBase[];
            switch (item.BagType) {
                case ItemBagType.Prop: datas = this.prop; break;
                case ItemBagType.Gem: datas = this.gem; break;
                case ItemBagType.Material: datas = this.material; break;
                case ItemBagType.Book: datas = this.book; break;
                case ItemBagType.Other: datas = this.other; break;
                default: throw new Error("未知背包数据类型" + id);
            }
            const dataLen = datas.length;
            for (let i = 0; i < dataLen; i++) {
                if (datas[ i ].id == id) {
                    datas[ i ].count += count;
                    if (datas[ i ].count <= 0)
                        datas.splice(i, 1);
                    return;
                }
            }
            if (count > 0) datas.push(new ItemBase(id, count));
        }
    }

    changeItemCollect(id: number, collect: boolean) {
        if (collect) this.collect.push(id);
        else this.collect.remove(id);
    }

    addEquip(equip: IEquipment): void {
        if (!equip) return;
        this.equipment.push(equip);
    }

    addNewEquip(id: number, count: number) {
        for (let i = 0; i < count; i++) {
            const equip = new Equipment(id);
            equip.createAttribute();
            this.addEquip(equip);
        }
    }

    removeEquip(uid: string) {
        const equips = this.equipment;
        for (let i = 0, n = equips.length; i < n; i++) {
            if (equips[ i ].uid == uid) {
                return equips.splice(i, 1)[ 0 ];
            }
        }
        return null;
    }
}