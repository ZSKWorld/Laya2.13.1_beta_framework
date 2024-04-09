
declare interface IBagCtrl {
    /** 使用物品 */
    useItem(data: IUseItemInput): void;
    /** 出售物品 */
    sellItem(data: ISellItemInput): void;
    /** 添加/取消 收藏 */
    changeCollect(data: IChangeCollectInput): void;
    /** 分解宝石 */
    decomposeGem(data: IDecomposeGemInput): void;

    /** 穿戴装备 */
    dressEquip(data: IDressEquipInput): void;
    /** 脱下装备 */
    takeOffEquip(data: ITakeOffEquipInput): void;
    /** 出售装备 */
    sellEquip(data: ISellEquipInput): void;
    /** 分解装备 */
    decomposeEquip(data: IDecomposeEquipInput): void;
}

declare interface IUseItemInput extends IUserInput {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface IUseItemOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: OriginData<IGoods>[];
}

declare interface ISellItemInput extends IUserInput {
    /** 物品id */
    id: number;
    /** 物品数量 */
    count: number;
}

declare interface ISellItemOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: OriginData<IGoods>[];
}

declare interface IChangeCollectInput extends IUserInput {
    /** 要收藏物品id */
    id: number;
    /** 添加/取消 */
    collect: boolean;
}

declare interface IChangeCollectOutput extends IUserOutput {

}

declare interface IDecomposeGemInput extends IUserInput {
    level: number;
}

declare interface IDecomposeGemOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: OriginData<IGoods>[];
}

declare interface IDressEquipInput extends IUserInput {
    /** 要穿戴装备的uid */
    uid: string;
}

declare interface IDressEquipOutput extends IUserOutput {
}

declare interface ITakeOffEquipInput extends IUserInput {
    /** 要脱下装备的部位 */
    part: number;
}

declare interface ITakeOffEquipOutput extends IUserOutput {
}

declare interface ISellEquipInput extends IUserInput {
    id: number;
    /** 要出售装备的uid */
    uid: string;
}

declare interface ISellEquipOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: OriginData<IGoods>[];
}

declare interface IDecomposeEquipInput extends IUserInput {
    star: number;
}

declare interface IDecomposeEquipOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: OriginData<IGoods>[];
}