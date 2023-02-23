import { GameUtil } from "../../utils/GameUtil";
import { MathUtil } from "../../utils/MathUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { BaseDataType, DataType, EquipmentPart, FoodRecoverType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { Bag } from "./Bag";
import { DressedEquipMap } from "./DataConst";
import { Formula } from "./Formula";
import { Equipment, ItemBase } from "./Item";
import { SyncProxy } from "./ProxyMgr";

const EncodeData: { name: string, Class: Class<ItemBase> }[] = [
    { name: "$equipments", Class: Equipment },//ItemBagType.Equip
    { name: "$Prop", Class: ItemBase },//ItemBagType.Prop
    { name: "$Gem", Class: ItemBase },//ItemBagType.Gem
    { name: "$Material", Class: ItemBase },//ItemBagType.Material
    { name: "$Book", Class: ItemBase },//ItemBagType.Book
    { name: "$Other", Class: ItemBase },//ItemBagType.Other
];

export class User implements IUser, SyncProxy<IUser> {
    //#region Properties
    uid: string = Util.CreateUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = TimeUtil.getTimeStamp();
    lastLoginTime: number = 0;
    lastOnlineTime: number = 0;
    friends: string[] = [];

    /** 离线数据 */
    offline?: IOffline = null;
    /** 金币 */
    coin: number = 0;
    /** 元宝 */
    vcoin: number = 0;
    /** 精力 */
    vigor: number = 0;
    /** 境界 */
    jingJie: number = 1;
    /** 层数 */
    cengJi: number = 1;
    /** 经验 */
    exp: number = 0;
    /** 魔核 */
    moHe: number = 0;
    /** 魔币 */
    moBi: number = 0;
    /** 灵石 */
    spiritStones: number = 0;
    /** 称号id */
    title: number = 0;
    /** 帮会id */
    society: number = 0;
    /** 门派id */
    sect: number = 0;
    /** 魂魄 */
    soul: number = 0;
    /** 宝石积分 */
    gemScore: number = 0;
    /** 武器 */
    weapon: IEquipment = null;
    /** 头盔 */
    helmet: IEquipment = null;
    /** 项链 */
    necklace: IEquipment = null;
    /** 衣服 */
    clothes: IEquipment = null;
    /** 戒指 */
    ring: IEquipment = null;
    /** 裤子 */
    trousers: IEquipment = null;
    /** 护符 */
    amulet: IEquipment = null;
    /** 鞋子 */
    shoes: IEquipment = null;
    /** 坐骑 */
    mount: IEquipment = null;
    /** 暗器 */
    hiddenWeeapon: IEquipment = null;
    /** 时装 */
    fashion: IEquipment = null;
    /** 法宝 */
    magicWeapon: IEquipment = null;
    /** 武器上装备的宝石 */
    weaponGems: number[] = [];
    /** 头盔上装备的宝石 */
    helmetGems: number[] = [];
    /** 项链上装备的宝石 */
    necklaceGems: number[] = [];
    /** 衣服上装备的宝石 */
    clothesGems: number[] = [];
    /** 戒指上装备的宝石 */
    ringGems: number[] = [];
    /** 裤子上装备的宝石 */
    trousersGems: number[] = [];
    /** 护符上装备的宝石 */
    amuletGems: number[] = [];
    /** 鞋子上装备的宝石 */
    shoesGems: number[] = [];
    /**关卡数据 */
    level: KeyData = {};
    /**副本数据 */
    copy: KeyData = {};
    /**秘境数据 */
    secret: KeyData = {};
    /**boss数据 */
    boss: KeyData = {};
    /**心法数据 */
    citta: KeyData = {};
    /**技能数据 */
    skill: number[] = [ 5000 ];
    /**出战技能 */
    usingSkill: number[] = [ 5000, 5000, 5000, 5000, 5000 ];
    bag: IBag = new Bag();
    //#endregion
    constructor(account: string, password: string, nickname: string) {
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
        this.vigor = this.getMaxVigro();
    }

    //#region 初始化相关
    getSyncInfo(): any { }
    clearSyncInfo(): any { }

    login(source: IUser) {
        const encodeDatas: any[][][] = [];
        EncodeData.forEach(v => {
            encodeDatas.push(source.bag[ v.name ]);
            delete source[ v.name ];
        });

        Object.keys(source).forEach(v => this[ v ] = source[ v ]);

        const { equipment, prop, gem, material, book, other } = this.bag;
        const objects = [ equipment, prop, gem, material, book, other ];
        encodeDatas.forEach((typeData, objIndex) => {
            if (typeData) {
                const keys = typeData.shift();
                typeData.forEach(data => {
                    const item = new EncodeData[ objIndex ].Class();
                    keys.reduce((pv, cv, index) => (pv[ cv ] = data[ index ], pv), item);
                    objects[ objIndex ].push(item);
                });
            }
        });
        this.lastLoginTime = TimeUtil.getTimeStamp();
        this.offline = GameUtil.getOffline(this);
    }

    save() {
        this.offline = null;

        const encodeKeys: string[] = [];
        EncodeData.forEach(v => encodeKeys.push(v.name));
        const { equipment, prop, gem, material, book, other } = this.bag;
        const objects = [ equipment, prop, gem, material, book, other ];

        objects.forEach((obj, objIndex) => {
            if (obj.length) {
                const itemKeys = Object.keys(obj[ 0 ]);
                const items = this.bag[ encodeKeys[ objIndex ] ] = [ itemKeys ];
                obj.forEach(data => {
                    const result = [];
                    itemKeys.forEach(key => result.push(data[ key ]));
                    items.push(result);
                });
                obj.length = 0;
            }
        });
        Util.saveData(this);
    }

    logout() {
        this.lastOnlineTime = TimeUtil.getTimeStamp();
        this.save();
    }
    //#endregion

    /** 获取当前境界最大精力 */
    getMaxVigro() {
        const citta = this.citta;
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复速率 */
    getVigorRecoveryRate() {
        return GameUtil.getVigorRecoveryRate(this);
    }

    /** 改变物品数量 */
    changeItemCount(id: number, count: number) {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData:
                switch (id) {
                    case BaseDataType.Coin: this.coin = Math.max(this.coin + count, 0); break;
                    case BaseDataType.Vcoin: this.vcoin = Math.max(this.vcoin + count, 0); break;
                    case BaseDataType.Exp: this.addExp(count); break;
                    case BaseDataType.MoHe: this.moHe = Math.max(this.moHe + count, 0); break;
                    case BaseDataType.MoBi: this.moBi = Math.max(this.moBi + count, 0); break;
                    case BaseDataType.SpiritStones: this.spiritStones = Math.max(this.spiritStones + count, 0); break;
                    case BaseDataType.Soul: this.soul = Math.max(this.soul + count, 0); break;
                    case BaseDataType.GemScore: this.gemScore = Math.max(this.gemScore + count, 0); break;
                    case BaseDataType.Vigor: this.vigor = Math.max(this.vigor + count, 0); break;
                    default: throw new Error("未知基础数据类型" + id);
                }
                break;
            case DataType.BagData: this.bag.changeItemCount(id, count); break;
            default: break;
        }
    }

    /** 获取物品数量 */
    getItemCount(id: number): number {
        switch (tableMgr.Item[ id ].DataType) {
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
                    default: throw new Error("未知基础数据类型" + id);
                }
            case DataType.BagData: return this.bag.getItem(id)?.count || 0;
            default: return 0;
        }
    }

    /** 获取已穿戴装备 */
    getDressedEquip(part: EquipmentPart): IEquipment {
        const key = DressedEquipMap[ part ];
        if (key) return this[ key ];
        else return null;
    }

    /** 设置穿戴装备 */
    setDressedEquip(part: EquipmentPart, equip: IEquipment) {
        const key = DressedEquipMap[ part ];
        key && (this[ key ] = equip);
    }

    /** 使用物品 */
    useItem(id: number, count: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        if (prop) return this.useProp(id, count);
        else if (food) return this.useFood(id, count);
        else if (skillBook) {
            this.changeItemCount(id, -1);
            this.skill.push(id);
            return [ new ItemBase(skillBook.ID, 1) ];
        }
        else if (xinFaBook) {
            this.changeItemCount(id, -1);
            this.citta[ id ] = 1;
            return [ new ItemBase(xinFaBook.ID, 1) ];
        }
        return [];
    }

    /** 出售物品 */
    sellItem(id: number, count: number) {
        const rewards: ItemBase[] = [];
        const sellRewards = tableMgr.Item[ id ].SellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                rewards.push(new ItemBase(v.id, v.count * count));
                if (GameUtil.isEquip(v.id)) this.bag.addNewEquip(v.id, v.count * count);
                else {
                    this.changeItemCount(v.id, v.count * count);
                }
            });
        }
        this.changeItemCount(id, -count);
        return rewards;
    }

    /** 穿戴装备 */
    dressEquip(uid: string) {
        const userdata = this;
        const equip = userdata.bag.removeEquip(uid);
        const dressedEquip = this.getDressedEquip(equip.part);
        userdata.bag.addEquip(dressedEquip);
        this.setDressedEquip(equip.part, equip);
    }

    /** 脱下装备 */
    takeOffEquip(part: EquipmentPart) {
        const userdata = this;
        const equip = this.getDressedEquip(part);
        this.setDressedEquip(part, null);
        userdata.bag.addEquip(equip);
    }

    /** 出售装备 */
    sellEquip(uid: string) {
        const equip = this.bag.getEquip(uid);
        this.bag.removeEquip(uid);
        return this.sellItem(equip.id, 1);
    }

    /** 按星级分解装备 */
    decomposeEquip(star: number) {
        const equips = this.bag.equipment;
        const equipCnt = equips.length;
        let rewards: ItemBase[] = [];
        for (let i = equipCnt - 1; i >= 0; i--) {
            if (equips[ i ].star == star) {
                rewards = rewards.concat(this.sellItem(equips[ i ].id, 1));
                equips.splice(i, 1);
            }
        }
        return rewards;
    }

    /** 购买物品 */
    buyGoods(id: number, count: number) {
        const item = tableMgr.Shop[ id ];
        item.SellPrice.forEach(v => this.changeItemCount(v.id, -v.count * count));
        if (GameUtil.isEquip(item.SellID)) this.bag.addNewEquip(item.SellID, count);
        else this.changeItemCount(item.SellID, count);
        const rewards: ItemBase[] = [ new ItemBase(item.SellID, count) ];
        return rewards;
    }

    /** 使用道具 */
    private useProp(id: number, count: number) {
        const userdata = this;
        const rewards: ItemBase[] = [];
        let useCount = 1;
        switch (id) {
            case 2007: userdata.copy = {}; break;
            case 2008: userdata.secret = {}; break;
            case 2009: userdata.boss = {}; break;
            case 2010: break;
            default:
                useCount = count;
                tableMgr.Props[ id ].Rewards.forEach(v => {
                    rewards.push(new ItemBase(v.id, v.count * count));
                    if (GameUtil.isEquip(v.id)) this.bag.addNewEquip(v.id, v.count * count);
                    else this.changeItemCount(v.id, v.count * count);
                });
                break;
        }
        this.changeItemCount(id, -useCount);
        return rewards;
    }

    /** 使用食物 */
    private useFood(id: number, count: number) {
        const userdata = this;
        const maxVigro = this.getMaxVigro();
        let useCount = 0;
        const food = tableMgr.Food[ id ];
        let singleRecover = 0;
        switch (food.RecoverType) {
            case FoodRecoverType.NumberRecover: singleRecover = food.RecoverValue; break;
            case FoodRecoverType.TimeRecover: singleRecover = food.RecoverValue * this.getVigorRecoveryRate(); break;
            case FoodRecoverType.PercentRecover: singleRecover = food.RecoverValue * maxVigro; break;
            default: throw new Error("未知食物类型");
        }
        const subVigro = maxVigro - userdata.vigor;
        if (subVigro <= singleRecover) useCount = 1;
        else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
        else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
        userdata.vigor = MathUtil.Clamp(userdata.vigor + singleRecover * useCount, 0, maxVigro);
        this.changeItemCount(id, -useCount);
        return [ new ItemBase(BaseDataType.Vigor, subVigro) ];
    }

    /**升级经验 ，没有为0*/
    private getUpgradeExp() {
        if (!tableMgr.JingJie[ this.jingJie + 1 ]) return 0;
        else return Formula.exp(this.jingJie, this.cengJi);
    }

    private addExp(num: number) {
        if (this.getUpgradeExp() == 0) return;
        this.exp = Math.max(this.exp + num, 0);
        const addExp2 = () => {
            //升层级
            if (this.exp >= this.getUpgradeExp()) {
                this.exp -= this.getUpgradeExp();
                this.cengJi++;
            };
            const maxCengji = +tableMgr.Const[ 1005 ].Value;
            if (tableMgr.JingJie[ this.jingJie + 1 ]) {
                //升境界
                if (this.cengJi > maxCengji) {
                    this.cengJi -= maxCengji;
                    this.jingJie++;
                }
            }
            if (this.getUpgradeExp() != 0) this.exp >= this.getUpgradeExp() && addExp2();
            else (this.exp = 0) && (this.cengJi = 0);
        }
        addExp2();
    }
}