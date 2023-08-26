import { GameUtil } from "../../utils/GameUtil";

export class IGoods implements IGoods {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        GameUtil.cantSyncObj(this);
        this.id = id;
        this.count = count;
    }

    encode(): IGoodsData {
        return this;
    }

    decode(data: IGoodsData): IGoods {
        if (data)
            Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        return this;
    }
}

