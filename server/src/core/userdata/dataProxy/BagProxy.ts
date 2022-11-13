import { MathUtil } from "../../../utils/MathUtil";
import { ItemBagType } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { ItemBase, Equipment } from "../Item";
import { ProxyBase } from "./ProxyBase";

export class BagProxy extends ProxyBase<IBag> {
    isCollect(id: number) { return this.data.collect.includes(id); }
    changeCollect(id: number, collect: boolean) {
        if (collect) this.data.collect.push(id);
        else this.data.collect.remove(id);
    }

    /** 获取背包物品 */
    getItem(id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        const bag = this.data;
        let datas: IItemBase[];
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = bag.prop; break;
            case ItemBagType.Gem: datas = bag.gem; break;
            case ItemBagType.Material: datas = bag.material; break;
            case ItemBagType.Book: datas = bag.book; break;
            case ItemBagType.Other: datas = bag.other; break;
        }
        if (datas) return datas.find(v => v.id == id);
        else return null;
    }

    /** 获取背包里的装备 */
    getEquip(uid: string) {
        return this.data.equipment.find(v => v.uid == uid);
    }

    /** 改变背包物品数量 */
    changeItemCount(id: number, count: number) {
        const item = tableMgr.Item[ id ];
        const bag = this.data;
        let datas: IItemBase[];
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = bag.prop; break;
            case ItemBagType.Gem: datas = bag.gem; break;
            case ItemBagType.Material: datas = bag.material; break;
            case ItemBagType.Book: datas = bag.book; break;
            case ItemBagType.Other: datas = bag.other; break;
            default: return;
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

    /** 获取背包物品数量 */
    getItemCount(id: number) {
        return this.getItem(id)?.count || 0;
    }

    /** 添加装备 */
    addNewEquip(id: number, count: number) {
        const equipInfo = tableMgr.Equipment[ id ];
        const { Main, WuXing, Second, Body } = tableMgr.EquipmentAddition[ equipInfo.Part ];
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
        const sortFunc = (a: number, b: number) => a > b ? 1 : -1;
        for (let i = 0; i < count; i++) {
            const equip = new Equipment(id);
            equip.star = MathUtil.RandomInt(1, +tableMgr.Const[ 1010 ].Value);

            randomAttri([ ...Main ], equip.mainAttri, false).sort(sortFunc);
            randomAttri([ ...WuXing ], equip.wuXingAttri, true).sort(sortFunc);
            randomAttri([ ...Second ], equip.secondAttri, true).sort(sortFunc);
            randomAttri([ ...Body ], equip.bodyAttri, true).sort(sortFunc);
            this.data.equipment.push(equip);
        }
    }

    /** 移除装备 */
    removeEquip(uid: string) {
        const equips = this.data.equipment;
        const equipCount = equips.length;
        for (let i = 0; i < equipCount; i++) {
            if (equips[ i ].uid == uid) {
                equips.splice(i, 1);
                break;
            }
        }

    }
}