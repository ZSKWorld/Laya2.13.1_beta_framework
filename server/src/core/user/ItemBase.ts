import { GameUtil } from "../../utils/GameUtil";

export class ItemBase implements IItemBase {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        GameUtil.cantSyncObj(this);
        this.id = id;
        this.count = count;
    }
}

