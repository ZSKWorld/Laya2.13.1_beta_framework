import { ItemBagType } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { Equipment } from "../Equipment";
import { ProxyBase } from "./ProxyBase";

export class BagProxy extends ProxyBase<IBag> {

    /** 获取背包物品 */
    getItem(id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        const bag = this.data;
        let datas: IItemBase[];
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
            // case ItemBagType.ShouCang: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = bag.prop; break;
            case ItemBagType.Gem: datas = bag.gem; break;
            case ItemBagType.Material: datas = bag.material; break;
            case ItemBagType.SkillBook: datas = bag.skillBook; break;
            case ItemBagType.Other: datas = bag.other; break;
            default: return;
        }
        const dataLen = datas.length;
        for (let i = 0; i < dataLen; i++) {
            if (datas[ i ].id == id) {
                datas[ i ].count += count;
                if (datas[ i ].count <= 0)
                    datas.splice(i, 1);
                break;
            }
        }
    }

    /** 添加装备 */
    addNewEquip(id: number, count: number) {
        for (let i = 0; i < count; i++) {
            this.data.equipment.push(new Equipment(id));
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