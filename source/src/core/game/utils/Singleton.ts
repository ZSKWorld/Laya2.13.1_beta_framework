import { Observer } from "../event/Observer";

export function Singleton<T>() {
    const singletonCls = class ObserverSingleton {
        private static _inst: T;
        static get Inst() {
            return this._inst || (this._inst = new this() as unknown as T);
        }
        protected constructor() { }
    }
    return singletonCls;
}

export function ObserverSingleton<T>() {
    return class ObserverSingleton extends Observer {
        private static _inst: T;
        static get Inst() {
            return this._inst || (this._inst = new this() as unknown as T);
        }
        protected constructor() { super(); }
    }
}