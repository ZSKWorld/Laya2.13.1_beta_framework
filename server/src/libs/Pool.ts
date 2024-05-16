export class Pool {
    private static _pool: { [key: string]: any[] } = {};

    public static get<T>(key: string, cls: new (...args: any) => T): T {
        const pool = this._pool[key];
        if (!pool || pool.length === 0) return new cls();
        else {
            const result = pool.pop();
            result.__inPool = false;
            return result;
        };
    }

    public static recover(key: string, value: any) {
        if (!value) return;
        if (value.__inPool) return;
        value.__inPool = true;
        let pool = this._pool[key];
        if (!pool) this._pool[key] = [value];
        else pool.push(value);
    }
}