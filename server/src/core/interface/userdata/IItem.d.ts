
declare interface IItemBase {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface IEquipment extends IItemBase {
    /** 装备uid，用于区分同id的不同装备 */
    uid: string;
    /** 装备星级 */
    star: number;
    /** 强化等级 */
    level: number;
    /** 铭刻等级 */
    mingKe: number;
    /** 神佑等级 */
    shenYou: number;
}