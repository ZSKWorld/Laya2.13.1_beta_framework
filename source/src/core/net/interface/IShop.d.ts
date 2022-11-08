declare interface IShop {
    buyGoods(data: BuyGoodsInput): void;
}

declare interface BuyGoodsInput extends UserInput {
    id: number;
    count: number;
}

declare interface BuyGoodsOutput extends UserOutput {

}