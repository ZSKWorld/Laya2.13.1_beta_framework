type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;
class PromiseElement {
    private _caller: any;
    private _reject: Reject;
    private _promise: Promise<any>;
    get caller() { return this._caller; }
    get promise() { return this._promise; }

    set<T>(caller: any, executor: Executor<T>) {
        this._caller = caller;
        this._promise = new Promise<T>((resolve, reject) => {
            this._reject = reject;
            executor(resolve, reject);
        }).finally(() => this.clear());
    }

    reject(reason?: any) {
        this._reject?.(reason);
    }

    private clear() {
        this._caller = null;
        this._reject = null;
        this._promise = null;
        Laya.Pool.recoverByClass(this);
    }

}

/** promise管理 */
class PromiseMgr {
    private _pool: PromiseElement[] = [];

    new<T = void>(caller: any, executor: Executor<T>) {
        const pe = Laya.Pool.createByClass(PromiseElement);
        pe.set(caller, executor);
        this._pool.push(pe);
        return pe.promise as Promise<T>;
    }

    remove(caller: any, reason?: any) {
        for (let i = this._pool.length - 1; i >= 0; i--) {
            const pe = this._pool[ i ];
            if (pe.caller === caller) {
                this._pool.splice(i, 1);
                pe.reject(reason);
            }
        }
    }
}
export const promiseMgr = new PromiseMgr();