export abstract class ProxyBase<T> {
    private _data: T;
    get data() { return this._data; }
    constructor(data: T) {
        this._data = data;
    }
}