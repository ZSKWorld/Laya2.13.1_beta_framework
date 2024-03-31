declare interface IShopCtrl {
    buyGoods(data: IBuyGoodsInput): void;
}

declare interface IBuyGoodsInput extends IUserInput {
    id: number;
    count: number;
}

declare interface IBuyGoodsOutput extends IUserOutput {
    /** 获得的奖励 */
    rewards: IGoods[];
}