import { GameUtil } from "../../utils/GameUtil";

export class ItemBase implements IItemBase {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        GameUtil.cantSyncObj(this);
        this.id = id;
        this.count = count;
    }
    encode(): IItemBase {
        throw new Error("Method not implemented.");
    }
    decode(data: IItemBase): IItemBase {
        if (data)
            Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        return this;
    }
}

