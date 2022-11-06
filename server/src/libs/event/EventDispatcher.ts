import { EventHandler } from "./EventHandler";

export class EventDispatcher {
    private _events: any;
    
    hasListener(type: string) {
        return !!(this._events && this._events[ type ]);
    }

    event(type: string, data: any = null) {
        if (!this._events || !this._events[ type ])
            return false;
        const listeners = this._events[ type ];
        if (listeners.run) {
            if (listeners.once)
                delete this._events[ type ];
            data != null ? listeners.runWith(data) : listeners.run();
        }
        else {
            for (let i = 0, n = listeners.length; i < n; i++) {
                const listener = listeners[ i ];
                if (listener) {
                    (data != null) ? listener.runWith(data) : listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
            if (listeners.length === 0 && this._events && this._events[ type ] && !this._events[ type ].run)
                delete this._events[ type ];
        }
        return true;
    }

    on(type: string, caller: any, listener: Function, args: any[] = null) {
        return this._createListener(type, caller, listener, args, false);
    }

    once(type: string, caller: any, listener: Function, args: any[] = null) {
        return this._createListener(type, caller, listener, args, true);
    }

    off(type: string, caller: any, listener: Function, onceOnly: boolean = false) {
        if (!this._events || !this._events[ type ])
            return this;
        var listeners = this._events[ type ];
        if (listeners != null) {
            if (listeners.run) {
                if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                    delete this._events[ type ];
                    listeners.recover();
                }
            }
            else {
                var count = 0;
                for (var i = 0, n = listeners.length; i < n; i++) {
                    var item = listeners[ i ];
                    if (!item) {
                        count++;
                        continue;
                    }
                    if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
                        count++;
                        listeners[ i ] = null;
                        item.recover();
                    }
                }
                if (count === n)
                    delete this._events[ type ];
            }
        }
        return this;
    }

    offAll(type: string = null) {
        var events = this._events;
        if (!events)
            return this;
        if (type) {
            this._recoverHandlers(events[ type ]);
            delete events[ type ];
        }
        else {
            for (var name in events) {
                this._recoverHandlers(events[ name ]);
            }
            this._events = null;
        }
        return this;
    }

    offAllCaller(caller: any) {
        if (caller && this._events) {
            for (var name in this._events) {
                this.off(name, caller, null);
            }
        }
        return this;
    }

    private _createListener(type: string, caller: any, listener: Function, args: any[], once: boolean, offBefore: boolean = true) {
        offBefore && this.off(type, caller, listener, once);
        var handler = EventHandler.create(caller || this, listener, args, once);
        this._events || (this._events = {});
        var events = this._events;
        if (!events[ type ])
            events[ type ] = handler;
        else {
            if (!events[ type ].run)
                events[ type ].push(handler);
            else
                events[ type ] = [ events[ type ], handler ];
        }
        return this;
    }

    private _recoverHandlers(arr) {
        if (!arr)
            return;
        if (arr.run) {
            arr.recover();
        }
        else {
            for (var i = arr.length - 1; i > -1; i--) {
                if (arr[ i ]) {
                    arr[ i ].recover();
                    arr[ i ] = null;
                }
            }
        }
    }
}