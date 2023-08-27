import { GameUtil } from "../../utils/GameUtil";
import { Decode } from "./Decode";

export class Goods extends Decode<IGoodsData, IGoods> implements IGoods {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        super();
        GameUtil.cantSyncObj(this);
        this.id = id;
        this.count = count;
    }
}