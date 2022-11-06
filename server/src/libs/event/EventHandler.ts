import { Handler } from "./Handler";

export class EventHandler extends Handler {
    protected static override _pool: EventHandler[] = [];

    override recover() {
        if (this._id > 0) {
            this._id = 0;
            EventHandler._pool.push(this.clear());
        }
    }

    static override create(caller: any, method: Function | null, args: any[] | null = null, once: boolean = true) {
        if (EventHandler._pool.length)
            return EventHandler._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    }
    
}