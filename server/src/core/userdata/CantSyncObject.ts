import { GameUtil } from "../../utils/GameUtil";
import { DecodeObject } from "./DecodeObject";

export class CantSyncObject<D = any, O = any> extends DecodeObject<D, O> {
    constructor() {
        super();
        GameUtil.cantSyncObj(this);
    }
}