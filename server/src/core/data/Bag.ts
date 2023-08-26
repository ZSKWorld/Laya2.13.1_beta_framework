import { cfgMgr } from "../config/CfgManager";
import { DataType, ItemBagType } from "../enum/ItemEnum";
import { Decode } from "./Decode";
import { Equipment } from "./Equipment";
import { Goods } from "./Goods";

export class Bag extends Decode<IBagData, IBag> implements IBag {
    collect: number[] = [];
    equipment: IEquipment[] = [];
    gem: Goods[] = [];
    prop: Goods[] = [];
    material: Goods[] = [];
    book: Goods[] = [];
    other: Goods[] = [];

    getItem(id: number) {
        const item = cfgMgr.Item[ id ];
        if (!item) return null;
        let datas: Goods[];
        switch (item.bagType) {
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
        const item = cfgMgr.Item[ id ];
        if (item.dataType == DataType.BagData) {
            let datas: Goods[];
            switch (item.bagType) {
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
            if (count > 0) datas.push(new Goods(id, count));
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
            this.addEquip(new Equipment(id).createAttribute());
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

    protected override onEncode(key: keyof this) {
        const arr = this[ key ] as any[];
        if (key == "collect") return arr;
        const result = [];
        if (arr && arr.length) {
            const keys = Object.keys(arr[ 0 ]);
            result.push(keys);

            arr.forEach(v => {
                const vData = [];
                keys.forEach(k => vData.push(v[ k ]));
                result.push(vData);
            });
        }
        return result;
    }

    protected override onDecode(data: IBagData, key: keyof IBagData) {
        switch (key) {
            case "collect": return data[ key ];
            default:
                const value = data[ key ] as unknown as any[][];
                const keys = value.shift();
                const result = [];
                const cls = key == "equipment" ? Equipment : Goods;
                value.forEach(v => {
                    const temp = {} as any;
                    keys.forEach((k, index) => temp[ k ] = v[ index ]);
                    result.push(new cls().decode(temp));
                });
                return result;
        }
    }
}