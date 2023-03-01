import { GameUtil } from "../../utils/GameUtil";
import { CantSyncObj } from "./CantSyncObj";
export class ItemBase extends CantSyncObj implements IItemBase {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        super();
        this.id = id;
        this.count = count;
    }
}

