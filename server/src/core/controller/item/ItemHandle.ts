import { MathUtil } from "../../../utils/MathUtil";
import { ProxyMgr } from "../../../utils/ProxyMgr";
import { cfgMgr } from "../../config/CfgManager";
import { Goods } from "../../data/Goods";
import { BaseDataType, DataType, FoodRecoverType } from "../../enum/ItemEnum";
import { ItemHelper } from "./ItemHelper";

export class ItemHandle {

    /**
     * 改变物品数量
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 加|减 数量
     */
    static changeItemCount(data: IUser, id: number, count: number) {
        const item = cfgMgr.Item[ id ];
        switch (item.dataType) {
            case DataType.BaseData: data.base.changeItemCount(id, count); break;
            case DataType.BagData:
                data.bag.changeItemCount(id, count);
                break;
            default: break;
        }
    }

    /**
     * 使用物品
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 使用数量
     * @returns 使用后获得的物品
     */
    static useItem(data: IUser, id: number, count: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            cfgMgr.Props[ id ], cfgMgr.Food[ id ], cfgMgr.SkillBook[ id ], cfgMgr.XinFaBook[ id ],
        ];
        if (prop) return this.useProp(data, id, count);
        else if (food) return this.useFood(data, id, count);
        else if (skillBook) {
            this.changeItemCount(data, id, -1);
            data.base.skill.push(id);
            return [ new Goods(skillBook.id, 1) ];
        }
        else if (xinFaBook) {
            this.changeItemCount(data, id, -1);
            data.base.citta[ id ] = 1;
            return [ new Goods(xinFaBook.id, 1) ];
        }
        return [];
    }

    /**
     * 出售物品
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 出售数量
     * @returns
     */
    static sellItem(data: IUser, id: number, count: number) {
        const rewards: Goods[] = [];
        const sellRewards = cfgMgr.Item[ id ].sellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                rewards.push(new Goods(v.id, v.count * count));
                if (ItemHelper.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
                else {
                    this.changeItemCount(data, v.id, v.count * count);
                }
            });
        }
        this.changeItemCount(data, id, -count);
        return rewards;
    }


    /**
     * 使用道具
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 使用数量
     * @returns 使用后获得的物品
     */
    private static useProp(data: IUser, id: number, count: number) {
        const rewards: Goods[] = [];
        let useCount = 1;
        switch (id) {
            case 2007: data.battle.copy = {}; break;
            case 2008: data.battle.secret = {}; break;
            case 2009: data.battle.boss = {}; break;
            case 2010: break;
            default:
                useCount = count;
                cfgMgr.Props[ id ].rewards.forEach(v => {
                    rewards.push(new Goods(v.id, v.count * count));
                    if (ItemHelper.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
                    else this.changeItemCount(data, v.id, v.count * count);
                });
                break;
        }
        this.changeItemCount(data, id, -useCount);
        return rewards;
    }

    /**
     * 使用食物
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 使用数量
     * @returns 使用后获得的物品
     */
    private static useFood(data: IUser, id: number, count: number) {
        const maxVigro = data.base.getMaxVigro();
        let useCount = 0;
        const food = cfgMgr.Food[ id ];
        let singleRecover = 0;
        switch (food.recoverType) {
            case FoodRecoverType.NumberRecover: singleRecover = food.recoverValue; break;
            case FoodRecoverType.TimeRecover: singleRecover = food.recoverValue * data.base.getVigorRecoveryRate(); break;
            case FoodRecoverType.PercentRecover: singleRecover = food.recoverValue * maxVigro; break;
            default: throw new Error("未知食物类型");
        }
        const subVigro = maxVigro - data.base.vigor;
        if (subVigro <= singleRecover) useCount = 1;
        else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
        else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
        data.base.vigor = MathUtil.Clamp(data.base.vigor + singleRecover * useCount, 0, maxVigro);
        this.changeItemCount(data, id, -useCount);
        return [ new Goods(BaseDataType.Vigor, subVigro) ];
    }
}