import { GameUtil } from "../../utils/GameUtil";
import { DecodeObject } from "./DecodeObject";

export class CantSyncObject<T = any> extends DecodeObject<T> {
    constructor() {
        super();
        GameUtil.cantSyncObj(this);
    }
}