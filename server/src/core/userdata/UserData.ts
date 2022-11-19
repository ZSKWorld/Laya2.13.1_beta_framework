import { GameUtil } from "../../utils/GameUtil";
import { MathUtil } from "../../utils/MathUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { ErrorCode } from "../enum/ErrorCode";
import { BaseDataType, DataType, EquipmentPart, FoodRecoverType, ItemBagType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { DressedEquipMap } from "./DataConst";
import { Formula } from "./Formula";
import { Equipment, ItemBase } from "./Item";
import { SyncProxy } from "./ProxyMgr";

const EncodeKey: { [ key in ItemBagType ]?: string } = {
    1: "$equipments",//ItemBagType.Equip
    2: "$Prop",//ItemBagType.Prop
    3: "$Gem",//ItemBagType.Gem
    4: "$Material",//ItemBagType.Material
    5: "$Book",//ItemBagType.Book
    6: "$Other",//ItemBagType.Other
};

export class UserData implements IUserData, SyncProxy<IUserData> {
    //#region Properties
    //#region BaseData
    uid: string = Util.CreateUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = TimeUtil.getTimeStamp();
    lastLoginTime: number = 0;
    lastOnlineTime: number = 0;
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
    //#endregion

    //#region BagData
    collect: number[] = [];
    equipment: IEquipment[] = [];
    gem: IItemBase[] = [];
    prop: IItemBase[] = [];
    material: IItemBase[] = [];
    book: IItemBase[] = [];
    other: IItemBase[] = [];
    //#endregion
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

    login(source: IUserData) {
        const encodeDatas: any[][][] = [];
        Object.keys(EncodeKey).forEach(key => {
            encodeDatas.push(source[ EncodeKey[ key ] ]);
            delete source[ EncodeKey[ key ] ];
        });

        Object.keys(source).forEach(v => this[ v ] = source[ v ]);

        const { equipment, prop, gem, material, book, other } = this;
        const objects = [ equipment, prop, gem, material, book, other ];
        encodeDatas.forEach((typeData, objIndex) => {
            if (typeData) {
                const keys = typeData.shift();
                typeData.forEach(data => {
                    const item = keys.reduce((pv, cv, index) => (pv[ cv ] = data[ index ], pv), {});
                    objects[ objIndex ].push(item);
                });
            }
        });
        this.lastLoginTime = TimeUtil.getTimeStamp();
        this.offline = this.getOffline();
    }

    /** 获取离线数据 */
    getOffline(): IOffline { return GameUtil.getOffline(this); }

    save() {
        this.offline = null;

        const encodeKeys = [];
        Object.keys(EncodeKey).forEach(key => encodeKeys.push(EncodeKey[ key ]));
        const { equipment, prop, gem, material, book, other } = this;
        const objects = [ equipment, prop, gem, material, book, other ];

        objects.forEach((obj, objIndex) => {
            if (obj.length) {
                const itemKeys = Object.keys(obj[ 0 ]);
                const items = this[ encodeKeys[ objIndex ] ] = [ itemKeys ];
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
            case DataType.BagData:
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
                break;
            default: break;
        }
    }

    /** 是否收藏 */
    isCollect(id: number) { return this.collect.includes(id); }

    /** 获取背包物品 */
    getItem(id: number) {
        const item = tableMgr.Item[ id ];
        if (!item) return null;
        let datas: IItemBase[];
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case ItemBagType.Prop: datas = this.prop; break;
            case ItemBagType.Gem: datas = this.gem; break;
            case ItemBagType.Material: datas = this.material; break;
            case ItemBagType.Book: datas = this.book; break;
            case ItemBagType.Other: datas = this.other; break;
        }
        if (datas) return datas.find(v => v.id == id);
        else return null;
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
            case DataType.BagData: return this.getItem(id)?.count || 0;
            default: return 0;
        }
    }

    /** 获取背包里的装备 */
    getEquip(uid: string) {
        return this.equipment.find(v => v.uid == uid);
    }

    /** 添加装备 */
    addNewEquip(id: number, count: number) {
        for (let i = 0; i < count; i++) {
            const equip = new Equipment(id);
            this.equipment.push(equip);
        }
    }

    /** 移除装备 */
    removeEquip(uid: string) {
        const equips = this.equipment;
        const equipCount = equips.length;
        for (let i = 0; i < equipCount; i++) {
            if (equips[ i ].uid == uid) {
                equips.splice(i, 1);
                break;
            }
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

    //#region 各种检查
    /** 检查当前境界是否满足物品境界需求 */
    checkJingJieEnough(id: number): boolean {
        const item = tableMgr.Item[ id ];
        if (!item) return false;
        const { jingJie: checkedJingJie, cengJi: checkedCengJi } = item.UseRequire;
        const { jingJie, cengJi } = this;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    }
    /** 检查是否可以使用物品 */
    checkUseItem(id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = this.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        const typeItem = GameUtil.canUseItem(id);
        if (!typeItem) return ErrorCode.ITEM_CAN_NOT_USE;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        else if (this.checkJingJieEnough(id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_USE;
        else if (GameUtil.isFood(id)) {
            if (this.vigor >= this.getMaxVigro())
                return ErrorCode.VIGOR_IS_FULL;
        }
        else if (GameUtil.isSkillBook(id)) {
            const SectRequire = (<ConfigSkillBookData>typeItem).SectRequire;
            if (SectRequire.length && SectRequire.indexOf(this.sect) == -1) return ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL;
            else if (this.skill.indexOf(id) != -1) return ErrorCode.SKILL_IS_LEARNED;
        } else if (GameUtil.isXinFaBook(id)) {
            if (this.citta[ id ] != null) return ErrorCode.CITTA_IS_LEARNED;
        }
        return ErrorCode.NONE;
    }
    /** 检查是否可以出售物品 */
    checkSellItem(id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        if (!tableMgr.Item[ id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        const item = this.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        return ErrorCode.NONE;
    }
    /** 检查是否可以穿戴装备 */
    checkDressEquip(uid: string): ErrorCode {
        const equip = this.getEquip(uid);
        if (equip == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (this.checkJingJieEnough(equip.id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_DRESS;
        return ErrorCode.NONE;
    }
    /** 检查是否可以脱下装备 */
    checkTakeOffEquip(part: EquipmentPart): ErrorCode {
        if (this.getDressedEquip(part) == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }
    /** 检查是否可以出售装备 */
    checkSellEquip(uid: string): ErrorCode {
        const equip = this.getEquip(uid);
        if (!equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!tableMgr.Item[ equip.id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }

    /** 检查物品收藏 */
    checkCollect(id: number, collect: boolean) {
        if (GameUtil.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this.isCollect(id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this.isCollect(id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }

    /** 检查是否可以购买物品 */
    checkBuyItem(id: number, count: number) {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = tableMgr.Shop[ id ];
        if (!item) return ErrorCode.GOODS_NOT_EXIST;
        for (let i = 0, n = item.SellPrice.length; i < n; i++) {
            const element = item.SellPrice[ i ];
            if (this.getItemCount(element.id) < element.count * count)
                return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        }
        return ErrorCode.NONE;
    }
    //#endregion

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
                if (GameUtil.isEquip(v.id)) this.addNewEquip(v.id, v.count * count);
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
        const equip = this.getEquip(uid);
        const part = tableMgr.Equipment[ equip.id ].Part;
        userdata.equipment.remove(equip);
        const dressedEquip = this.getDressedEquip(part);
        if (dressedEquip) userdata.equipment.push(dressedEquip);
        this.setDressedEquip(part, equip);
    }

    /** 脱下装备 */
    takeOffEquip(part: EquipmentPart) {
        const userdata = this;
        const equip = this.getDressedEquip(part);
        this.setDressedEquip(part, null);
        userdata.equipment.push(equip);
    }

    /** 出售装备 */
    sellEquip(uid: string) {
        const equip = this.getEquip(uid);
        this.removeEquip(uid);
        return this.sellItem(equip.id, 1);
    }

    /** 分解装备 */
    decomposeEquip(star: number) {
        const equips = this.equipment;
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
        if (GameUtil.isEquip(item.SellID)) this.addNewEquip(item.SellID, count);
        else this.changeItemCount(item.SellID, count);
        const rewards: ItemBase[] = [ new ItemBase(item.SellID, count) ];
        return rewards;
    }

    /** 添加/取消 收藏 */
    changeCollect(id: number, collect: boolean) {
        if (collect) this.collect.push(id);
        else this.collect.remove(id);
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
                    if (GameUtil.isEquip(v.id)) this.addNewEquip(v.id, v.count * count);
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