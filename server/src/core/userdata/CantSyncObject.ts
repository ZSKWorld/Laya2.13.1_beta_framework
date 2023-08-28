import { GameUtil } from "../../utils/GameUtil";
import { Decode } from "./Decode";

export class CantSyncObject<D = any, O = any> extends Decode<D, O> {
    constructor() {
        super();
        GameUtil.cantSyncObj(this);
    }
}