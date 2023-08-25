
declare interface IItemHandleCtrl {
    /** 使用物品 */
    useItem(data: UseItemInput): void;
    /** 出售物品 */
    sellItem(data: SellItemInput): void;
    /** 添加/取消 收藏 */
    changeCollect(data: ChangeCollectInput): void;
}

declare interface UseItemInput extends UserInput {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface UseItemOutput extends UserOutput {
    /** 获得的奖励 */
    rewards: IItemBaseData[];
}

declare interface SellItemInput extends UserInput {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface SellItemOutput extends UseItemOutput {
}

declare interface ChangeCollectInput extends UserInput {
    /** 要收藏物品id */
    id: number;
    /** 添加/取消 */
    collect: boolean;
}

declare interface ChangeCollectOutput extends UserOutput {
}
