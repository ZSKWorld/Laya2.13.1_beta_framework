import { storage } from "../libs/localStorage/LocalStorage";
import { MathUtil } from "../libs/math/MathUtil";
import { tableMgr } from "../table/TableManager";
import { BagType, EquipmentPart } from "./Interface";

export class BagItem {
    protected _id: number = 0;
    protected _uid: string = "";
    protected _count: number = 0;
    get id() { return this._id; }
    get uid() { return this._uid; }
    get count() { return this._count; }
    get name() { return tableMgr.Item[this._id].Name; }
    get quality() { return tableMgr.Item[this._id].Quality; }
    get qualityColor() { return tableMgr.Color[this.quality].Color; }
    get sellReward() { return tableMgr.Item[this._id].SellRewards; }
    get useRequire() { return tableMgr.Item[this._id].UseRequire; }

    constructor(id: number, count: number = 0) {
        this._id = id;
        this._count = count;
    }

    changeCount(num: number) {
        this._count = Math.max(this._count + num, 0);
    }
    clone() {
        return BagItem.Clone(this);
    }
    static Clone(source: BagItem) {
        if (!source) return null;
        return Object.assign(new BagItem(source._id, source._count), source);
    }
}

export class EquipmentItem extends BagItem {
    protected _star: number = 1;
    protected _level: number = 0;
    protected _mingKe: number = 0;
    protected _shenYou: number = 0;
    protected _mainAttri: number[] = [];
    protected _wuXingAttri: number[] = [];
    protected _secondAttri: number[] = [];
    protected _bodyAttri: number[] = [];
    get name() { return tableMgr.Equipment[this._id].Name; }
    get quality() { return this._star; }
    get mainAttri() { return this._mainAttri; }
    get wuXingAttri() { return this._wuXingAttri; }
    get secondAttri() { return this._secondAttri; }
    get bodyAttri() { return this._bodyAttri; }

    get isSpecialEquip() { return false; }

    /**装备星级 */
    get star() { return this._star; }
    /**强化等级 */
    get level() { return this._level; }
    /**铭刻等级 */
    get mingKe() { return this._mingKe; }
    /**神佑等级 */
    get shenYou() { return this._shenYou; }
    /**神佑加成 */
    get shenYouAddition() { return 0; }
    /**装备部位 */
    get part() { return <EquipmentPart>(tableMgr.Equipment[this._id].Part); }
    /**装备属性加成 */
    get addition() { return null;/**tableMgr.Equipment[this._id].Addition; */ }

    constructor(id: number) {
        super(id, 1);
        this._uid = MathUtil.CreateUID();
    }
    initEquip() {
        this._star = MathUtil.RandomInt(1, +tableMgr.Const[1010].Value);
        const { Main, WuXing, Second, Body } = tableMgr.EquipmentAddition[this.part];
        const randomAttri = (source: number[], attri: number[], randomLen: boolean) => {
            attri.length = 0;
            if (source.length) {
                let attriCount = randomLen ? MathUtil.RandomInt(1, source.length) : source.length;
                while (attriCount > 0) {
                    attri.push(...source.splice(MathUtil.RandomInt(0, source.length - 1), 1));
                    attriCount--;
                }
            }
            return attri;
        }
        const sortFunc = (a, b) => a > b ? 1 : -1;
        randomAttri([...Main], this._mainAttri, false).sort(sortFunc);
        randomAttri([...WuXing], this._wuXingAttri, true).sort(sortFunc);
        randomAttri([...Second], this._secondAttri, true).sort(sortFunc);
        randomAttri([...Body], this._bodyAttri, true).sort(sortFunc);
        return this;
    }

    changeCount(num: number) { }
    getMainAttriValue(id: number) {

    }
    getWuXingAttriValue(id: number) {

    }
    getSecondAttriValue(id: number) {

    }
    getBodyAttriValue(id: number) {

    }
    intensify() {
        this._level++;
    }

    clone(): EquipmentItem {
        return EquipmentItem.Clone(this);
    }

    static Clone(source: EquipmentItem) {
        if (!source) return null;
        return Object.assign(new EquipmentItem(source._id), source);
    }
}

export class SpecialEquipmentItem extends EquipmentItem {
    protected _sectAttri: number[] = [];

    get isSpecialEquip() { return true; }
    initEquip() {
        super.initEquip();
        this._star = +tableMgr.Const[1010].Value;
        return this;
    }

    clone(): SpecialEquipmentItem {
        return SpecialEquipmentItem.Clone(this);
    }

    static Clone(source: SpecialEquipmentItem) {
        if (!source) return null;
        return Object.assign(new SpecialEquipmentItem(source._id), source);
    }
}

export class BagData {
    private _cangPin: number[] = [];
    private _equipment: EquipmentItem[] = [];//极限19万个左右
    private _gem: BagItem[] = [];
    private _prop: BagItem[] = [];
    private _material: BagItem[] = [];
    private _book: BagItem[] = [];
    private _other: BagItem[] = [];
    private sortItems(items: BagItem[]) {
        items.sort((a, b) => {
            if (a.quality > b.quality) return 1;
            else if (a.quality < b.quality) return -1;
            else {
                if (a.id > b.id) return 1;
                else if (a.id < b.id) return -1;
                else return 0;
            }
        });
    }

    private addItem(id: number, count: number): void {
        const type = tableMgr.Item[id].BagType;
        const items = this.getItems(type);
        if (!items) return;
        switch (type) {
            case BagType.Equip:
                for (let i = 0; i < count; i++)
                    items.push(new EquipmentItem(id).initEquip());
                break;
            case BagType.Gem:
            case BagType.Prop:
            case BagType.Material:
            case BagType.Book:
            case BagType.Other:
                const item = this.getItem(id);
                if (!item)
                    items.push(new BagItem(id, count));
                else
                    item.changeCount(count);
                break;
            default: return;
        }
        this.sortItems(items);
    }
    private deleteItem(id: number, count: number, uid?: string): void {
        const type = tableMgr.Item[id].BagType;
        const items = this.getItems(type);
        if (!items) return;
        for (let i = 0, n = items.length; i < n; i++) {
            const item = items[i];
            if (item.id == id) {
                if (type == BagType.Equip) {
                    if (item.uid == uid) {
                        items.splice(i, 1);
                        break;
                    }
                } else {
                    item.changeCount(count);
                    if (item.count <= 0) {
                        items.splice(i, 1);
                    };
                    break;
                }
            }
        }
    }

    getItems(type: BagType): BagItem[] {
        switch (type) {
            case BagType.ShouCang: return this._cangPin.filter(v => !!this.getItem(v)).map(v => this.getItem(v));
            case BagType.Equip: return this._equipment;
            case BagType.Prop: return this._prop;
            case BagType.Gem: return this._gem;
            case BagType.Material: return this._material;
            case BagType.Book: return this._book;
            case BagType.Other: return this._other;
            default: return null;
        }
    }

    changeItemCount(id: number, count: number, uid?: string): void {
        if (count > 0) this.addItem(id, count);
        else this.deleteItem(id, count, uid);
    }

    getItem(id: number, uid?: string): BagItem {
        const type = tableMgr.Item[id].BagType;
        if (type == BagType.Equip && !uid) return null;
        const items = this.getItems(type);
        for (let i = 0, n = items.length; i < n; i++) {
            const item = items[i];
            if (item.id == id && (!uid || item.uid == uid))
                return item;
        }
        return null;
    }

    addEquipment(equip: EquipmentItem): void {
        if (equip) {
            this._equipment.push(equip);
            this.sortItems(this._equipment);
        }
    }

    changeCangPin(id: number) {
        const index = this._cangPin.indexOf(id);
        if (index == -1) this._cangPin.push(id);
        else this._cangPin.splice(index, 1);
    }
    getIsCangPin(id: number) {
        return this._cangPin.indexOf(id) != -1;
    }

    Encode() {
        let result = { _cangPin: this._cangPin, _equipment: [], _gem: [], _prop: [], _material: [], _book: [], _other: [] };
        if (this._equipment.length) {
            const keys = Object.keys(this._equipment[0]);
            this._equipment.forEach(v => keys.forEach(v1 => result._equipment.push(v[v1])));
        }
        if (this._gem.length) {
            const keys = Object.keys(this._gem[0]);
            this._gem.forEach(v => keys.forEach(v1 => result._gem.push(v[v1])));
        }
        if (this._prop.length) {
            const keys = Object.keys(this._prop[0]);
            this._prop.forEach(v => keys.forEach(v1 => result._prop.push(v[v1])));
        }
        if (this._material.length) {
            const keys = Object.keys(this._material[0]);
            this._material.forEach(v => keys.forEach(v1 => result._material.push(v[v1])));
        }
        if (this._book.length) {
            const keys = Object.keys(this._book[0]);
            this._book.forEach(v => keys.forEach(v1 => result._book.push(v[v1])));
        }
        if (this._other.length) {
            const keys = Object.keys(this._other[0]);
            this._other.forEach(v => keys.forEach(v1 => result._other.push(v[v1])));
        }

        return result;
    }

    static Decode(key: string, returnNew?: boolean) {
        const data = storage.get<BagData>(key);
        if (!data && !returnNew) return null;
        const result = new BagData();
        if (data) {
            result._cangPin = data._cangPin;

            const equipKeys = Object.keys(new EquipmentItem(0));
            const itemKeys = Object.keys(new BagItem(0, 0));
            const decodeFunc = function (arr: any[], resultArr: any[], keys: any[], cls: any) {
                for (let i = 0; i < arr.length; i += keys.length) {
                    const equip = new cls(0, 0);
                    for (let j = 0; j < keys.length; j++) {
                        equip[keys[j]] = arr[i + j];
                    }
                    resultArr.push(equip);
                }
            }
            decodeFunc(data._equipment, result._equipment, equipKeys, EquipmentItem);
            decodeFunc(data._prop, result._prop, itemKeys, BagItem);
            decodeFunc(data._gem, result._gem, itemKeys, BagItem);
            decodeFunc(data._material, result._material, itemKeys, BagItem);
            decodeFunc(data._book, result._book, itemKeys, BagItem);
            decodeFunc(data._other, result._other, itemKeys, BagItem);
        }
        return result;
    }
}