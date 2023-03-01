import { GameUtil } from "../../../utils/GameUtil";
import { MathUtil } from "../../../utils/MathUtil";
import { BaseDataType, DataType, FoodRecoverType } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { ItemBase } from "../../user/ItemBase";

export class ItemHandle {

    /**
     * 获取物品数量
     * @param data 目标用户数据
     * @param id 物品id
     * @returns 物品数量
     */
    static getItemCount(data: IUser, id: number): number {
        switch (tableMgr.Item[ id ].DataType) {
            case DataType.BaseData: return data.base.getItemCount(id);
            case DataType.BagData: return data.bag.getItem(id)?.count || 0;
            default: return 0;
        }
    }

    /**
     * 改变物品数量
     * @param data 目标用户数据
     * @param id 物品id
     * @param count 加|减 数量
     */
    static changeItemCount(data: IUser, id: number, count: number) {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData: data.base.changeItemCount(id, count); break;
            case DataType.BagData: data.bag.changeItemCount(id, count); break;
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
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        if (prop) return this.useProp(data, id, count);
        else if (food) return this.useFood(data, id, count);
        else if (skillBook) {
            this.changeItemCount(data, id, -1);
            data.base.skill.push(id);
            return [ new ItemBase(skillBook.ID, 1) ];
        }
        else if (xinFaBook) {
            this.changeItemCount(data, id, -1);
            data.base.citta[ id ] = 1;
            return [ new ItemBase(xinFaBook.ID, 1) ];
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
        const rewards: ItemBase[] = [];
        const sellRewards = tableMgr.Item[ id ].SellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                rewards.push(new ItemBase(v.id, v.count * count));
                if (GameUtil.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
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
        const rewards: ItemBase[] = [];
        let useCount = 1;
        switch (id) {
            case 2007: data.battle.copy = {}; break;
            case 2008: data.battle.secret = {}; break;
            case 2009: data.battle.boss = {}; break;
            case 2010: break;
            default:
                useCount = count;
                tableMgr.Props[ id ].Rewards.forEach(v => {
                    rewards.push(new ItemBase(v.id, v.count * count));
                    if (GameUtil.isEquip(v.id)) data.bag.addNewEquip(v.id, v.count * count);
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
        const maxVigro = GameUtil.getMaxVigro(data);
        let useCount = 0;
        const food = tableMgr.Food[ id ];
        let singleRecover = 0;
        switch (food.RecoverType) {
            case FoodRecoverType.NumberRecover: singleRecover = food.RecoverValue; break;
            case FoodRecoverType.TimeRecover: singleRecover = food.RecoverValue * GameUtil.getVigorRecoveryRate(data); break;
            case FoodRecoverType.PercentRecover: singleRecover = food.RecoverValue * maxVigro; break;
            default: throw new Error("未知食物类型");
        }
        const subVigro = maxVigro - data.base.vigor;
        if (subVigro <= singleRecover) useCount = 1;
        else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
        else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
        data.base.vigor = MathUtil.Clamp(data.base.vigor + singleRecover * useCount, 0, maxVigro);
        this.changeItemCount(data, id, -useCount);
        return [ new ItemBase(BaseDataType.Vigor, subVigro) ];
    }
}