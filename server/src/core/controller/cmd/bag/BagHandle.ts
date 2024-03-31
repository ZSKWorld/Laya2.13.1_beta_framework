import { MathUtil } from "../../../../utils/MathUtil";
import { cfgMgr } from "../../../config/CfgManager";
import { BaseDataType, DataType, EquipmentPart, FoodRecoverType } from "../../../enum/ItemEnum";
import { Goods } from "../../../userdata/Goods";
import { BagHelper } from "./BagHelper";

export class BagHandle {

    /**
     * 改变物品数量
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 加|减 数量
     */
    static changeItemCount(data: IUser, id: number, count: number) {
        const item = cfgMgr.Item[id];
        switch (item.dataType) {
            case DataType.BaseData: data.base.changeItemCount(id, count); break;
            case DataType.BagData: data.bag.changeItemCount(id, count); break;
            default: break;
        }
    }

    /** 使用物品 */
    static useItem(data: IUser, id: number, count: number) {
        const isProp = BagHelper.isProp(id);
        const isFood = BagHelper.isFood(id);
        const isSkillBook = BagHelper.isSkillBook(id);
        const isXinFaBook = BagHelper.isXinFaBook(id);
        if (isProp) return this.useProp(data, id, count);
        else if (isFood) return this.useFood(data, id, count);
        else if (isSkillBook) {
            this.changeItemCount(data, id, -1);
            data.base.skill.push(id);
            return [new Goods(id, 1)];
        }
        else if (isXinFaBook) {
            this.changeItemCount(data, id, -1);
            data.base.citta[id] = 1;
            return [new Goods(id, 1)];
        }
        return [];
    }

    /** 出售物品 */
    static sellItem(data: IUser, id: number, count: number) {
        const rewards: IGoods[] = [];
        const sellRewards = cfgMgr.Item[id].sellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                rewards.push(new Goods(v.id, v.count * count));
                if (BagHelper.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
                else {
                    this.changeItemCount(data, v.id, v.count * count);
                }
            });
        }
        this.changeItemCount(data, id, -count);
        return rewards;
    }


    /** 使用道具 */
    private static useProp(data: IUser, id: number, count: number) {
        const rewards: IGoods[] = [];
        let useCount = 1;
        switch (id) {
            case 2007: data.battle.copy.reset(); break;
            case 2008: data.battle.secret.reset(); break;
            case 2009: data.battle.boss.reset(); break;
            case 2010: break;
            default:
                useCount = count;
                cfgMgr.Props[id].rewards.forEach(v => {
                    rewards.push(new Goods(v.id, v.count * count));
                    if (BagHelper.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
                    else this.changeItemCount(data, v.id, v.count * count);
                });
                break;
        }
        this.changeItemCount(data, id, -useCount);
        return rewards;
    }

    /** 使用食物 */
    private static useFood(data: IUser, id: number, count: number) {
        const maxVigro = data.base.maxVigro;
        let useCount = 0;
        const food = cfgMgr.Food[id];
        let singleRecover = 0;
        switch (food.recoverType) {
            case FoodRecoverType.NumberRecover: singleRecover = food.recoverValue; break;
            case FoodRecoverType.TimeRecover: singleRecover = food.recoverValue * data.base.vigorRecover; break;
            case FoodRecoverType.PercentRecover: singleRecover = food.recoverValue * maxVigro; break;
            default: throw new Error("未知食物类型");
        }
        const subVigro = maxVigro - data.base.vigor;
        if (subVigro <= singleRecover) useCount = 1;
        else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
        else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
        data.base.vigor = MathUtil.Clamp(data.base.vigor + singleRecover * useCount, 0, maxVigro);
        this.changeItemCount(data, id, -useCount);
        return [new Goods(BaseDataType.Vigor, subVigro)];
    }

    /** 按等级分解宝石 */
    static decomposeGemByLevel(data: IUser, level: number) {
        const gems = data.bag.gem;
        let rewards: IGoods[] = [];
        for (let i = gems.length - 1; i >= 0; i--) {
            if (cfgMgr.Gem[gems[i].id].level == level) {
                rewards = rewards.concat(BagHandle.sellItem(data, gems[i].id, 1));
                gems.splice(i, 1);
            }
        }
        return rewards;
    }

    /** 穿戴装备 */
    static dressEquip(data: IUser, uid: string) {
        const { bag, body } = data;
        const equip = bag.removeEquip(uid);
        const dressedEquip = body.getDressedEquip(equip.part);
        bag.addEquip(dressedEquip);
        body.setDressedEquip(equip.part, equip);
    }

    /** 脱下装备 */
    static takeOffEquip(data: IUser, part: EquipmentPart) {
        const { bag, body } = data;
        const equip = body.getDressedEquip(part);
        body.setDressedEquip(part, null);
        bag.addEquip(equip);
    }

    /** 出售装备 */
    static sellEquip(data: IUser, uid: string) {
        const equip = data.bag.getEquip(uid);
        data.bag.removeEquip(uid);
        return BagHandle.sellItem(data, equip.id, 1);
    }

    /** 按星级分解装备 */
    static decomposeEquipByStar(data: IUser, star: number) {
        const equips = data.bag.equipment;
        let rewards: IGoods[] = [];
        for (let i = equips.length - 1; i >= 0; i--) {
            if (equips[i].star == star) {
                rewards = rewards.concat(BagHandle.sellItem(data, equips[i].id, 1));
                equips.splice(i, 1);
            }
        }
        return rewards;
    }
}