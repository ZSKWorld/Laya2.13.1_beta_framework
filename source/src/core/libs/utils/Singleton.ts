export function Singleton<T>() {
    return class Singleton {
        private static _inst: T;
        static get inst() {
            return this._inst || (this._inst = new this() as T);
        }
        protected constructor() { }
    }
}