export class Handler {
    protected static _pool: Handler[] = [];
    private static _gid = 1;
    protected _id = 0;
    once = false;
    caller: Object | null;
    method: Function | null;
    args: any[] | null;

    constructor(caller: Object | null = null, method: Function | null = null, args: any[] | null = null, once: boolean = false) {
        this.setTo(caller, method, args, once);
    }

    setTo(caller: any, method: Function | null, args: any[] | null, once: boolean = false) {
        this._id = Handler._gid++;
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    }

    run() {
        if (this.method == null)
            return null;
        var id = this._id;
        var result = this.method.apply(this.caller, this.args);
        this._id === id && this.once && this.recover();
        return result;
    }

    runWith(data: any) {
        if (this.method == null)
            return null;
        var id = this._id;
        if (data == null)
            var result = this.method.apply(this.caller, this.args);
        else if (!this.args && !data.unshift)
            result = this.method.call(this.caller, data);
        else if (this.args)
            result = this.method.apply(this.caller, this.args.concat(data));
        else
            result = this.method.apply(this.caller, data);
        this._id === id && this.once && this.recover();
        return result;
    }

    clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    }

    recover() {
        if (this._id > 0) {
            this._id = 0;
            Handler._pool.push(this.clear());
        }
    }

    static create(caller: any, method: Function | null, args: any[] | null = null, once: boolean = true) {
        if (Handler._pool.length)
            return Handler._pool.pop().setTo(caller, method, args, once);
        return new Handler(caller, method, args, once);
    }
}