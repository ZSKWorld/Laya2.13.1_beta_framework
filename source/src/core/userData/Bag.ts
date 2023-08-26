import { DataType, ItemBagType } from "../net/enum/ItemEnum";
import { Decode } from "./Decode";
import { Equipment, Goods } from "./Goods";

export class Bag extends Decode<IBag> implements IBag {
    private static readonly ClassName = "BagData";
    collect: number[];
    equipment: IEquipment[];
    gem: IGoods[];
    prop: IGoods[];
    material: IGoods[];
    book: IGoods[];
    other: IGoods[];

    isCollect(id: number) { return this.collect.includes(id); }

    getItemCount(id: number) {
        const item = cfgMgr.Item[ id ];
        if (!item) return 0;
        if (item.dataType != DataType.BagData) return 0;
        return this.getItem(id)?.count || 0;
    }

    getItem(id: number) {
        const item = cfgMgr.Item[ id ];
        if (!item) return null;
        let datas: IGoods[];
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

    getItems(type: ItemBagType) {
        switch (type) {
            case ItemBagType.Collect: return this.collect.filter(v => !!this.getItem(v)).map(v => this.getItem(v));
            case ItemBagType.Equip: return this.equipment;
            case ItemBagType.Prop: return this.prop;
            case ItemBagType.Gem: return this.gem;
            case ItemBagType.Material: return this.material;
            case ItemBagType.Book: return this.book;
            case ItemBagType.Other: return this.other;
            default: return null;
        }
    }

    protected override onDecode(data: PartialAll<IBag>, key: keyof IBag) {
        switch (key) {
            case "equipment": return data[ key ].map(v => v instanceof Equipment ? v : new Equipment().decode(v));
            case "gem":
            case "prop":
            case "material":
            case "book":
            case "other": return data[ key ].map(v => v instanceof Goods ? v : new Goods().decode(v));
            default: return data[ key ];
        }
    }

}