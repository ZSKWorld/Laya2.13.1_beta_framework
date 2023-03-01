import { GameUtil } from "../../utils/GameUtil";

export abstract class CantSyncObj {
    constructor() {
        GameUtil.cantSyncObj(this);
    }
}