import { Observer } from "../event/Observer";

export function Singleton<T>() {
    const singletonCls = class ObserverSingleton {
        private static inst: T;
        static get Inst() {
            return this.inst || (this.inst = new this() as unknown as T);
        }
        protected constructor() { }
    }
    return singletonCls;
}

export function ObserverSingleton<T>() {
    return class ObserverSingleton extends Observer {
        private static inst: T;
        static get Inst() {
            return this.inst || (this.inst = new this() as unknown as T);
        }
        protected constructor() { super(); }
    }
}