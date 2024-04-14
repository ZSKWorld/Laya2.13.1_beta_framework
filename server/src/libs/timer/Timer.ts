import { GameUtil } from "../../utils/GameUtil";
import { TimeUtil } from "../../utils/TimeUtil";
type TimerMethod = Function & { $_TID?: number };
class TimerHandle {
    key: string;
    caller: any;
    method: TimerMethod;
    args: any;
    repeat: boolean = false;
    userFrame: boolean = false;
    delay: number = 0;
    exeTime: number = 0;
    jumpFrame: boolean = false;
    clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        this.repeat = false;
        this.userFrame = false;
        this.delay = 0;
        this.exeTime = 0;
        this.jumpFrame = false;
    }
    run(withClear) {
        var caller = this.caller;
        if (caller && caller.destroyed)
            return this.clear();
        var method = this.method;
        var args = this.args;
        withClear && this.clear();
        if (method == null)
            return;
        args ? method.apply(caller, args) : method.call(caller);
    }
}

export class Timer {
    static timer: Timer = new Timer();
    private static _pool: TimerHandle[] = [];
    private static _mid = 1;

    private _delta: number = 0;
    private _lastTimer: number = TimeUtil.milliSeconds();
    private _map: KeyMap<TimerHandle> = {};
    private _handlers: TimerHandle[] = [];
    private _temp: TimerHandle[] = [];
    private _count: number = 0;
    scale: number = 1;
    currTimer: number = TimeUtil.milliSeconds();
    currFrame: number = 0;
    constructor(autoActive = true) {
        autoActive && Timer.timer && Timer.timer.frameLoop(1, this, this._update);
    }
    get delta() {
        return this._delta;
    }
    private _update() {
        if (this.scale <= 0) {
            this._lastTimer = TimeUtil.milliSeconds();
            this._delta = 0;
            return;
        }
        var frame = this.currFrame = this.currFrame + this.scale;
        var now = TimeUtil.milliSeconds();
        var awake = (now - this._lastTimer) > 30000;
        this._delta = (now - this._lastTimer) * this.scale;
        var timer = this.currTimer = this.currTimer + this._delta;
        this._lastTimer = now;
        var handlers = this._handlers;
        this._count = 0;
        for (var i = 0, n = handlers.length; i < n; i++) {
            var handler = handlers[i];
            if (handler.method !== null) {
                var t = handler.userFrame ? frame : timer;
                if (t >= handler.exeTime) {
                    if (handler.repeat) {
                        if (!handler.jumpFrame || awake) {
                            handler.exeTime += handler.delay;
                            handler.run(false);
                            if (t > handler.exeTime) {
                                handler.exeTime += Math.ceil((t - handler.exeTime) / handler.delay) * handler.delay;
                            }
                        }
                        else {
                            while (t >= handler.exeTime) {
                                handler.exeTime += handler.delay;
                                handler.run(false);
                            }
                        }
                    }
                    else {
                        handler.run(true);
                    }
                }
            }
            else {
                this._count++;
            }
        }
        if (this._count > 30 || frame % 200 === 0)
            this._clearHandlers();
    }
    private _clearHandlers() {
        var handlers = this._handlers;
        for (var i = 0, n = handlers.length; i < n; i++) {
            var handler = handlers[i];
            if (handler.method !== null)
                this._temp.push(handler);
            else
                this._recoverHandler(handler);
        }
        this._handlers = this._temp;
        handlers.length = 0;
        this._temp = handlers;
    }
    private _recoverHandler(handler: TimerHandle) {
        if (this._map[handler.key] == handler)
            delete this._map[handler.key];
        handler.clear();
        Timer._pool.push(handler);
    }
    private _create(useFrame, repeat, delay, caller, method, args, coverBefore) {
        if (!delay) {
            method.apply(caller, args);
            return null;
        }
        if (coverBefore) {
            var handler = this._getHandler(caller, method);
            if (handler) {
                handler.repeat = repeat;
                handler.userFrame = useFrame;
                handler.delay = delay;
                handler.caller = caller;
                handler.method = method;
                handler.args = args;
                handler.exeTime = delay + (useFrame ? this.currFrame : this.currTimer + TimeUtil.milliSeconds() - this._lastTimer);
                return handler;
            }
        }
        handler = Timer._pool.length > 0 ? Timer._pool.pop() : new TimerHandle();
        handler.repeat = repeat;
        handler.userFrame = useFrame;
        handler.delay = delay;
        handler.caller = caller;
        handler.method = method;
        handler.args = args;
        handler.exeTime = delay + (useFrame ? this.currFrame : this.currTimer + TimeUtil.milliSeconds() - this._lastTimer);
        this._indexHandler(handler);
        this._handlers.push(handler);
        return handler;
    }
    private _indexHandler(handler: TimerHandle) {
        var caller = handler.caller;
        var method = handler.method;
        var cid = caller ? caller.$_GID || (caller.$_GID = GameUtil.getGID()) : 0;
        var mid = method.$_TID || (method.$_TID = Timer._mid++);
        handler.key = cid + "_" + mid;
        this._map[handler.key] = handler;
    }

    once(delay: number, caller: any, method: Function, args: any[] = null, coverBefore = true) {
        this._create(false, false, delay, caller, method, args, coverBefore);
    }

    loop(delay: number, caller: any, method: Function, args: any[] = null, coverBefore: boolean = true, jumpFrame: boolean = false) {
        var handler = this._create(false, true, delay, caller, method, args, coverBefore);
        if (handler)
            handler.jumpFrame = jumpFrame;
    }

    frameOnce(delay: number, caller: any, method: Function, args: any[] = null, coverBefore: boolean = true) {
        this._create(true, false, delay, caller, method, args, coverBefore);
    }

    frameLoop(delay: number, caller: any, method: Function, args: any[] = null, coverBefore: boolean = true) {
        this._create(true, true, delay, caller, method, args, coverBefore);
    }
    toString() {
        return " handlers:" + this._handlers.length + " pool:" + Timer._pool.length;
    }

    clear(caller: any, method: Function) {
        var handler = this._getHandler(caller, method);
        if (handler) {
            handler.clear();
        }
    }

    clearAll(caller: any) {
        if (!caller)
            return;
        for (var i = 0, n = this._handlers.length; i < n; i++) {
            var handler = this._handlers[i];
            if (handler.caller === caller) {
                handler.clear();
            }
        }
    }
    private _getHandler(caller: any, method: TimerMethod) {
        var cid = caller ? caller.$_GID || (caller.$_GID = GameUtil.getGID()) : 0;
        var mid = method.$_TID || (method.$_TID = Timer._mid++);
        var key = cid + "_" + mid;
        return this._map[key];
    }

    runTimer(caller: any, method: TimerMethod) {
        var handler = this._getHandler(caller, method);
        if (handler && handler.method != null) {
            this._map[handler.key] = null;
            handler.run(true);
        }
    }
    pause() {
        this.scale = 0;
    }
    resume() {
        this.scale = 1;
    }
}