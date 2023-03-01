import { DataType } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";

export class ItemHelper {
    static isEquip(id: number) { return !!tableMgr.Equipment[ id ]; }
    static isProp(id: number) { return !!tableMgr.Props[ id ]; }
    static isFood(id: number) { return !!tableMgr.Food[ id ]; }
    static isSkillBook(id: number) { return !!tableMgr.SkillBook[ id ]; }
    static isXinFaBook(id: number) { return !!tableMgr.XinFaBook[ id ]; }

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
     * 检查当前境界是否满足物品境界需求
     * @param data 用户数据
     * @param id 物品id
     * @returns 
     */
     static checkJingJieEnough(data: IUser, id: number): boolean {
        const item = tableMgr.Item[ id ];
        if (!item) return false;
        const { jingJie: checkedJingJie, cengJi: checkedCengJi } = item.UseRequire;
        const { jingJie, cengJi } = data.base;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    }
}