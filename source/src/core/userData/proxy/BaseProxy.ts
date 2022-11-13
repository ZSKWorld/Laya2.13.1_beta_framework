import { Observer } from "../../libs/event/Observer";

export abstract class BaseProxy<T>  extends Observer{
    private _source: T;
    protected get source() { return this._source; }

    constructor(source: T) {
        super();
        this.setSource(source);
    }

    setSource(source: T) {
        this._source = source;
    }
}