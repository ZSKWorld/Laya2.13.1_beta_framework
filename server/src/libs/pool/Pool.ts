export const enum PoolKey {
    EventDispatcher = "EventDispatcher",
}
export class Pool {
    private static _pool: { [ key in PoolKey ]?: any[] } = {};
    public static get<T>(key: PoolKey, cls: new (...args: any) => T): T {
        const pool = this._pool[ key ];
        if (!pool || pool.length === 0) return new cls();
        else return pool.pop();
    }
    public static recover(key: PoolKey, value: any) {
        if (!value) return;
        let pool = this._pool[ key ];
        if (!pool) this._pool[ key ] = [ value ];
        else pool.push(value);
    }
}