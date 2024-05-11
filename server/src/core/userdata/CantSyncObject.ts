import { CantSyncKey } from "../../utils/ProxyMgr";
import { DecodeObject } from "./DecodeObject";

export class CantSyncObject<T = any> extends DecodeObject<T> {
    constructor() {
        super();
        Object.defineProperty(this, CantSyncKey, {
            configurable: false,
            enumerable: false,
            value: true,
        });
    }
}