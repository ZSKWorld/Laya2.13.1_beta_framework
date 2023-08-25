import { DataType, ItemBagType } from "../enum/ItemEnum";
import { Equipment } from "./Equipment";
import { ItemBase } from "./ItemBase";

const EncodeData: { name: string, Class: Class<ItemBase> }[] = [
    { name: "$equipments", Class: Equipment },//ItemBagType.Equip
    { name: "$Prop", Class: ItemBase },//ItemBagType.Prop
    { name: "$Gem", Class: ItemBase },//ItemBagType.Gem
    { name: "$Material", Class: ItemBase },//ItemBagType.Material
    { name: "$Book", Class: ItemBase },//ItemBagType.Book
    { name: "$Other", Class: ItemBase },//ItemBagType.Other
];

export class Bag implements IBag {
    collect: number[] = [];
    equipment: IEquipment[] = [];
    gem: IItemBase[] = [];
    prop: IItemBase[] = [];
    material: IItemBase[] = [];
    book: IItemBase[] = [];
    other: IItemBase[] = [];
    encode(): IBag {
        const data = {} as IBag;
        data.collect = this.collect;
        const encodeArrData = (arr: any[]) => {
            if (!arr || !arr.length) return arr;
            const keys = Object.keys(arr[ 0 ]);
            const result = [];
            result.push(keys);

            arr.forEach(v => {
                const vData = [];
                keys.forEach(k => vData.push(v[ k ]));
                result.push(vData);
            });
            return result;
        };
        data.equipment = encodeArrData(this.equipment);
        data.gem = encodeArrData(this.gem);
        data.prop = encodeArrData(this.prop);
        data.material = encodeArrData(this.material);
        data.book = encodeArrData(this.book);
        data.other = encodeArrData(this.other);
        return data;
    }

    decode(data: IBag): IBag {
        this.collect = data.collect;
        const decodeArrData = (data: any[][], cls: Class<IDecode<any>>) => {
            if (!data || !data.length) return data;
            const keys = data.shift();
            const result = [];
            data.forEach(v => {
                const temp = {};
                keys.forEach((k, index) => temp[ k ] = v[ index ]);
                result.push(new cls().decode(temp));
            });
            return result;
        };
        this.equipment = decodeArrData(data.equipment as any, Equipment);
        this.gem = decodeArrData(data.gem as any, ItemBase);
        this.prop = decodeArrData(data.prop as any, ItemBase);
        this.material = decodeArrData(data.material as any, ItemBase);
        this.book = decodeArrData(data.book as any, ItemBase);
        this.other = decodeArrData(data.other as any, ItemBase);
        return this;
    }

    getItem(id: number) {
        const item = cfgMgr.Item[ id ];
        if (!item) return null;
        let datas: IItemBase[];
        switch (item.BagType) {
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
}