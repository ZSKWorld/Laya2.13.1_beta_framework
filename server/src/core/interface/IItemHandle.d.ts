
declare interface IItemHandle {
    /** 使用物品 */
    useItem(data: UseItemInput): void;
    /** 出售物品 */
    sellItem(data: SellItemInput): void;
    /** 穿戴装备 */
    dressEquip(data: DressEquipInput): void;
    /** 脱下装备 */
    takeOffEquip(data: TakeOffEquipInput): void;
    /** 出售装备 */
    sellEquip(data: SellEquipInput): void;
}

declare interface UseItemInput extends UserInput {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface UseItemOutput extends UserOutput {
    /** 使用获得的奖励 */
    useRewards: IItemBase[];
}

declare interface SellItemInput extends UserInput, IItemBase {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface SellItemOutput extends UserOutput {
    /** 出售获得的奖励  */
    sellRewards: IItemBase[];
}

declare interface DressEquipInput extends UserInput {
    /** 要穿戴装备的uid */
    uid: string;
}

declare interface DressEquipOutput extends UserOutput {
}

declare interface TakeOffEquipInput extends UserInput {
    /** 要脱下装备的部位 */
    part: number;
}

declare interface TakeOffEquipOutput extends UserOutput {
}

declare interface SellEquipInput extends UserInput {
    /** 要出售装备的uid */
    uid: string;
}

declare interface SellEquipOutput extends UserOutput {
}