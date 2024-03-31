import { Pool } from "../../libs/pool/Pool";
import { Connection } from "../Connection";

export class Controller {
    private _connection: Connection;
    get connection() { return this._connection; }
    get user() { return this._connection.user; }

    static create<T>(connection: Connection) {
        const result = Pool.get(this.prototype.constructor.name as any, this);
        result._connection = connection;
        return result as T;
    }

    update(delta: number) {}

    close() {}

    recover() {
        this._connection = null;
        Pool.recover(this.constructor.name as any, this);
    }
}