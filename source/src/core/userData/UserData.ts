import { GameUtil } from "../common/GameUtil";
import { Event } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { MathUtil } from "../libs/math/MathUtil";
import { Logger } from "../libs/utils/Logger";
import { UpperFirst } from "../libs/utils/Util";
import { BaseDataType, DataType, EquipmentPart, ItemBagType } from "../net/enum/ItemEnum";
import { NetMessage } from "../net/enum/NetMessage";
import { tableMgr } from "../table/TableManager";
import { Equipment, ItemBase } from "./proxy/ItemData";

const logger = Logger.Create("UserData", true);

class UserData extends Observer implements IUserData {

    //#region Properties
    uid: string;
    /** 昵称 */
    nickname: string;
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
    /** 注册时间戳 */
    registerTime: number;
    /** 最后一次登录时间戳 */
    lastLoginTime: number;
    /** 最后一次在线时间 */
    lastOnlineTime: number;
    /** 好友列表 */
    friends: string[];
    /** 离线数据 */
    offline?: IOffline;
    /** 金币 */
    coin: number;
    /** 元宝 */
    vcoin: number;
    /** 精力 */
    vigor: number;
    /** 境界 */
    jingJie: number;
    /** 层数 */
    cengJi: number;
    /** 经验 */
    exp: number;
    /** 魔核 */
    moHe: number;
    /** 魔币 */
    moBi: number;
    /** 灵石 */
    spiritStones: number;
    /** 称号id */
    title: number;
    /** 帮会id */
    society: number;
    /** 门派id */
    sect: number;
    /** 魂魄 */
    soul: number;
    /** 宝石积分 */
    gemScore: number;
    /** 武器 */
    weapon: Equipment;
    /** 头盔 */
    helmet: Equipment;
    /** 项链 */
    necklace: Equipment;
    /** 衣服 */
    clothes: Equipment;
    /** 戒指 */
    ring: Equipment;
    /** 裤子 */
    trousers: Equipment;
    /** 护符 */
    amulet: Equipment;
    /** 鞋子 */
    shoes: Equipment;
    /** 坐骑 */
    mount: Equipment;
    /** 暗器 */
    hiddenWeeapon: Equipment;
    /** 时装 */
    fashion: Equipment;
    /** 法宝 */
    magicWeapon: Equipment;
    /** 武器上装备的宝石 */
    weaponGems: number[];
    /** 头盔上装备的宝石 */
    helmetGems: number[];
    /** 项链上装备的宝石 */
    necklaceGems: number[];
    /** 衣服上装备的宝石 */
    clothesGems: number[];
    /** 戒指上装备的宝石 */
    ringGems: number[];
    /** 裤子上装备的宝石 */
    trousersGems: number[];
    /** 护符上装备的宝石 */
    amuletGems: number[];
    /** 鞋子上装备的宝石 */
    shoesGems: number[];
    /**关卡数据 */
    level: KeyData;
    /**副本数据 */
    copy: KeyData;
    /**秘境数据 */
    secret: KeyData;
    /**boss数据 */
    boss: KeyData;
    /**心法数据 */
    citta: KeyData;
    /**技能数据 */
    skill: number[];
    /**出战技能 */
    usingSkill: number[];

    //#region BagData
    collect: number[];
    equipment: Equipment[];
    gem: IItemBase[];
    prop: IItemBase[];
    material: IItemBase[];
    book: IItemBase[];
    other: IItemBase[];
    //#endregion
    //#endregion

    /** 升级经验 */
    get upgradeExp() { return GameUtil.getUpgradExp(this.jingJie, this.cengJi); }

    /** 获取最大精力 */
    get maxVigro() {
        let xinFaJL = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复 */
    get jingLiHuiFu() {
        let xinFaJLHF = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    getItemCount(id: number): number {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData:
                switch (id) {
                    case BaseDataType.Coin: return this.coin;
                    case BaseDataType.Vcoin: return this.vcoin;
                    case BaseDataType.Exp: return this.exp;
                    case BaseDataType.MoHe: return this.moHe;
                    case BaseDataType.MoBi: return this.moBi;
                    case BaseDataType.SpiritStones: return this.spiritStones;
                    case BaseDataType.Soul: return this.soul;
                    case BaseDataType.GemScore: return this.gemScore;
                    case BaseDataType.Vigor: return this.vigor;
                    default: return 0;
                }
            case DataType.BagData: return this.getItem(id)?.count || 0;
            default: return 0;
        }
    }

    getDressedEquip(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weapon;
            case EquipmentPart.Helmet: return this.helmet;
            case EquipmentPart.Necklace: return this.necklace;
            case EquipmentPart.Clothes: return this.clothes;
            case EquipmentPart.Ring: return this.ring;
            case EquipmentPart.Trousers: return this.trousers;
            case EquipmentPart.Amulet: return this.amulet;
            case EquipmentPart.Shoes: return this.shoes;
            case EquipmentPart.Mount: return this.mount;
            case EquipmentPart.Fashion: return this.fashion;
            case EquipmentPart.HiddenWeeapon: return this.hiddenWeeapon;
            case EquipmentPart.MagicWeapon: return this.magicWeapon;
            default: return null;
        }
    }

    getEquipGems(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weaponGems;
            case EquipmentPart.Helmet: return this.helmetGems;
            case EquipmentPart.Necklace: return this.necklaceGems;
            case EquipmentPart.Clothes: return this.clothesGems;
            case EquipmentPart.Ring: return this.ringGems;
            case EquipmentPart.Trousers: return this.trousersGems;
            case EquipmentPart.Amulet: return this.amuletGems;
            case EquipmentPart.Shoes: return this.shoesGems;
            default: return null;
        }
    }

    getEquipInfoStr(equip: Equipment, hasGem: boolean) {
        let str = "";
        if (equip) {
            const dressed = this.getDressedEquip(equip.part) == equip;
            str = `
                ${ equip.colorLevelName }${ dressed ? "&nbsp;(已装备)" : "" }<br>
			    ${ this.getEquipStartStr(equip.star) }<br>
                ${ equip.infoStr }
            `;
            const gems = hasGem ? this.getEquipGems(equip.part) : null;
            if (gems) {
                const tableItem = tableMgr.Item;
                const [ gem0, gem1, gem2, gem3 ] = gems;
                const { Quality: quality0, Name: name0 } = gem0 ? tableItem[ gem0 ] : {} as any;
                const { Quality: quality1, Name: name1 } = gem1 ? tableItem[ gem1 ] : {} as any;
                const { Quality: quality2, Name: name2 } = gem2 ? tableItem[ gem2 ] : {} as any;
                const { Quality: quality3, Name: name3 } = gem3 ? tableItem[ gem3 ] : {} as any;
                str += `
                    孔1:${ gem0 ? GameUtil.getColorStr(quality0, name0) : "空" }<br>
                    孔2:${ gem1 ? GameUtil.getColorStr(quality1, name1) : "空" }<br>
                    孔3:${ gem2 ? GameUtil.getColorStr(quality2, name2) : "空" }<br>
                    孔4:${ gem3 ? GameUtil.getColorStr(quality3, name3) : "空" }<br>
                `;
            }
            str += "评分:2.5万";
        }
        return str;
    }

    /** 副本剩余次数 */
    getCopyTime(copyId: number) {
        return tableMgr.FuBen[ copyId ].BattleCount - (this.copy[ copyId ] ?? 0);
    }

    /** 秘境剩余次数 */
    getSecretTime(secretId: number) {
        return tableMgr.MiJing[ secretId ].BattleCount - (this.secret[ secretId ] ?? 0);
    }

    /** 获取boss剩余冷却时间 */
    getBossCoolDown(bossId: number) {
        return Math.max(tableMgr.Boss[ bossId ].CoolTime - Math.floor(GameUtil.getServerTime() / 1000 - (this.boss[ bossId ] ?? 0)), 0);
    }


    isCollect(id: number) { return this.collect.includes(id); }

    getItem(id: number) {
        const item = tableMgr.Item[ id ];
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


    private getEquipStartStr(star: number) {
        const maxStar = +tableMgr.Const[ 1010 ].Value;
        star = MathUtil.Clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "✭" : "✩");
        }
        return result;
    }

    @Event(NetMessage.SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            const oldValue = this[ v ];
            switch (v) {
                case "weapon":
                case "helmet":
                case "necklace":
                case "clothes":
                case "ring":
                case "trousers":
                case "amulet":
                case "shoes":
                case "mount":
                case "hiddenWeeapon":
                case "fashion":
                case "magicWeapon": this[ v ] = Equipment.Decode(data[ v ]); break;

                case "equipment": this[ v ] = data[ v ].reduce((pv, cv, index) => (pv.push(Equipment.Decode(cv)), pv), []); break;
                case "gem":
                case "prop":
                case "material":
                case "book":
                case "other": this[ v ] = data[ v ].reduce((pv, cv, index) => (pv.push(ItemBase.Decode(cv)), pv), []); break;

                default: this[ v ] = data[ v ]; break;
            }
            this.dispatch(`${ UpperFirst(v) }_Changed`, [ oldValue, data[ v ] ]);
        });
    }
}

export type UserDataType = UserData;
export const userData = new UserData();
windowImmit("userData", userData);
