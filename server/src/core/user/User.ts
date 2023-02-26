import { GameUtil } from "../../utils/GameUtil";
import { MathUtil } from "../../utils/MathUtil";
import { Util } from "../../utils/Util";
import { BaseDataType, DataType, EquipmentPart, FoodRecoverType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Body } from "./Body";
import { Equipment } from "./Equipment";
import { ItemBase } from "./ItemBase";
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
    account: IAccount = null;
    base: IBase = new Base();
    friends: string[] = [];

    /** 离线数据 */
    offline?: IOffline = null;
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
    body: IBody = new Body();
    bag: IBag = new Bag();
    //#endregion
    constructor(account: string, password: string, nickname: string) {
        this.account = new Account(account, password, nickname);
        this.base.vigor = GameUtil.getMaxVigro(this);
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
        this.account.login();
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
        this.account.logout();
        this.save();
    }
    //#endregion

    /** 改变物品数量 */
    changeItemCount(id: number, count: number) {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData: this.base.changeItemCount(id, count); break;
            case DataType.BagData: this.bag.changeItemCount(id, count); break;
            default: break;
        }
    }

    /** 获取物品数量 */
    getItemCount(id: number): number {
        switch (tableMgr.Item[ id ].DataType) {
            case DataType.BaseData: return this.base.getItemCount(id);
            case DataType.BagData: return this.bag.getItem(id)?.count || 0;
            default: return 0;
        }
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
        const { bag, body } = this;
        const equip = bag.removeEquip(uid);
        const dressedEquip = body.getDressedEquip(equip.part);
        bag.addEquip(dressedEquip);
        body.setDressedEquip(equip.part, equip);
    }

    /** 脱下装备 */
    takeOffEquip(part: EquipmentPart) {
        const { bag, body } = this;
        const equip = body.getDressedEquip(part);
        body.setDressedEquip(part, null);
        bag.addEquip(equip);
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
        const maxVigro = GameUtil.getMaxVigro(this);
        let useCount = 0;
        const food = tableMgr.Food[ id ];
        let singleRecover = 0;
        switch (food.RecoverType) {
            case FoodRecoverType.NumberRecover: singleRecover = food.RecoverValue; break;
            case FoodRecoverType.TimeRecover: singleRecover = food.RecoverValue * GameUtil.getVigorRecoveryRate(this); break;
            case FoodRecoverType.PercentRecover: singleRecover = food.RecoverValue * maxVigro; break;
            default: throw new Error("未知食物类型");
        }
        const subVigro = maxVigro - userdata.base.vigor;
        if (subVigro <= singleRecover) useCount = 1;
        else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
        else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
        userdata.base.vigor = MathUtil.Clamp(userdata.base.vigor + singleRecover * useCount, 0, maxVigro);
        this.changeItemCount(id, -useCount);
        return [ new ItemBase(BaseDataType.Vigor, subVigro) ];
    }
}