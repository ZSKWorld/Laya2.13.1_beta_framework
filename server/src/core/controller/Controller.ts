import { Pool } from "../../libs/Pool";
import { Connection } from "../Connection";
interface CtrlLoopInfo {
    time: number;
    interval: number;
    method: Function;
}
class EventLoopper {
    private _loopInfos: CtrlLoopInfo[];

    update(delta: number) {
        this._loopInfos && this._loopInfos.forEach(v => {
            v.time += delta;
            if (v.time >= v.interval) {
                v.time -= v.interval;
                v.method.call(this);
            }
        });
    }

    recover() {
        this._loopInfos && this._loopInfos.forEach(v => v.time = 0);
    }
}

export class Controller extends EventLoopper {
    private _connection: Connection;
    get connection() { return this._connection; }
    get user() { return this._connection.user; }

    static create<T>(connection: Connection) {
        const result = Pool.get(this.prototype.constructor.name, this);
        result._connection = connection;
        return result as T;
    }

    close() { }

    override recover() {
        super.recover();
        this._connection = null;
        Pool.recover(this.constructor.name, this);
    }
}

export function CtrlLoop(interval: number) {
    return function (method: any, context: ClassMethodDecoratorContext) {
        context.addInitializer(function () {
            const _this = this as any;
            _this._loopInfos = (_this._loopInfos || []) as CtrlLoopInfo[];
            _this._loopInfos.push({ interval, method, time: 0 });
        });
    }
}