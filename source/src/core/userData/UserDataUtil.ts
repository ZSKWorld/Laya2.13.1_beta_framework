import { GameUtil } from "../common/GameUtil";
import { MathUtil } from "../libs/math/MathUtil";
import { DataType, EquipmentPart, ItemBagType } from "../net/enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { UserDataFormula } from "./UserDataFormula";

export class UserDataUtil {
    static readonly DressedEquipMap: { readonly [ key in EquipmentPart ]: string } = {
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

    static readonly BaseDataKeyMap: { readonly [ key: string ]: string } = {
        1001: "coin",
        1002: "vcoin",
        1003: "exp",
        1004: "moHe",
        1005: "moBi",
        1006: "spiritStones",
        1007: "soul",
        1008: "gemScore",
        1009: "vigor",
    }

    /** 境界转等级 */
    static jingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+tableMgr.Const[ 1005 ].Value) + cengJi;
    }

    /** 等级转境界 */
    static levelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +tableMgr.Const[ 1005 ].Value;
        if (level % maxCengJie == 0) {
            jingJie = level / maxCengJie;
            cengJi = maxCengJie;
        } else {
            jingJie = Math.floor(level / maxCengJie);
            cengJi = level - jingJie * maxCengJie;
            jingJie += 1;
        }
        return { jingJie, cengJi };
    }

    static isCollect(data: IBag, id: number) {
        return data.collect.includes(id);
    }

    static getItem(data: IBag, id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        let datas: IItemBase[];
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = data.prop; break;
            case ItemBagType.Gem: datas = data.gem; break;
            case ItemBagType.Material: datas = data.material; break;
            case ItemBagType.Book: datas = data.book; break;
            case ItemBagType.Other: datas = data.other; break;
        }
        if (datas) return datas.find(v => v.id == id);
        else return null;
    }

    static getItems(data: IBag, type: ItemBagType) {
        switch (type) {
            case ItemBagType.Collect: return data.collect.filter(v => !!this.getItem(data, v)).map(v => this.getItem(data, v));
            case ItemBagType.Equip: return data.equipment;
            case ItemBagType.Prop: return data.prop;
            case ItemBagType.Gem: return data.gem;
            case ItemBagType.Material: return data.material;
            case ItemBagType.Book: return data.book;
            case ItemBagType.Other: return data.other;
            default: return null;
        }
    }

    /** 获取物品数量 */
    static getItemCount(data: IUserData, id: number): number {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData: return data[ this.BaseDataKeyMap[ id ] ];
            case DataType.BagData:
                const item = tableMgr.Item[ id ];
                let datas: IItemBase[];
                switch (item.BagType) {
                    // case ItemBagType.Collect: break;
                    // case ItemBagType.Equip: break;
                    case ItemBagType.Prop: datas = data.bag.prop; break;
                    case ItemBagType.Gem: datas = data.bag.gem; break;
                    case ItemBagType.Material: datas = data.bag.material; break;
                    case ItemBagType.Book: datas = data.bag.book; break;
                    case ItemBagType.Other: datas = data.bag.other; break;
                    default: return 0;
                }
                const dataLen = datas.length;
                for (let i = 0; i < dataLen; i++) {
                    if (datas[ i ].id == id) return datas[ i ].count;
                }
                return 0;
            default: return 0;
        }
    }

    /** 获取升级经验 */
    static getUpgradExp(jingJie: number, cengJi: number) {
        if (!tableMgr.JingJie[ jingJie + 1 ]) return 0;
        else return UserDataFormula.exp(this.jingJieToLevel(jingJie, cengJi));
    }

    /** 获取境界字符串 */
    static getJingJieStr(jingJie: number, cengJi: number) {
        return tableMgr.JingJie[ jingJie ].Name + (cengJi ? (MathUtil.ToChineseNum(cengJi) + "层") : "");
    }

    /** 获取最大精力 */
    static getMaxVigro(citta: KeyData) {
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复 */
    static jingLiHuiFu(citta: KeyData) {
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    /** 副本剩余次数 */
    static getCopyTime(copyId: number, copy: KeyData) {
        return tableMgr.FuBen[ copyId ].BattleCount - (copy[ copyId ] ?? 0);
    }
    /** 秘境剩余次数 */
    static getSecretTime(secretId: number, secret: KeyData) {
        return tableMgr.FuBen[ secretId ].BattleCount - (secret[ secretId ] ?? 0);
    }
    /** 获取boss剩余冷却时间 */
    static getBossCoolDown(bossId: number, boss: KeyData) {
        return Math.max(tableMgr.Boss[ bossId ].CoolTime - Math.floor(GameUtil.getServerTime() / 1000 - (boss[ bossId ] ?? 0)), 0);
    }
}