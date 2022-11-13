import { ItemBagType } from "../../net/enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { BaseProxy } from "./BaseProxy";
import { Equipment, ItemBase } from "./ItemProxy";

export class Bag extends BaseProxy<IBag> implements IBag {
    //#region SourceProperties
    get collect(): number[] { return this.source.collect; }
    get equipment(): Equipment[] { return this.source.equipment as any; }
    get gem(): ItemBase[] { return this.source.gem as any; }
    get prop(): ItemBase[] { return this.source.prop as any; }
    get material(): ItemBase[] { return this.source.material as any; }
    get book(): ItemBase[] { return this.source.book as any; }
    get other(): ItemBase[] { return this.source.other as any; }
    //#endregion

    constructor(source: IBag) {
        super(source);
        this.source.equipment = this.source.equipment.map(v => new Equipment(v));
        this.source.gem = this.source.gem.map(v => new ItemBase(v));
        this.source.prop = this.source.prop.map(v => new ItemBase(v));
        this.source.material = this.source.material.map(v => new ItemBase(v));
        this.source.book = this.source.book.map(v => new ItemBase(v));
        this.source.other = this.source.other.map(v => new ItemBase(v));
    }

    isCollect(id: number) { return this.collect.includes(id); }

    getItem(id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        let datas: ItemBase[];
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
}