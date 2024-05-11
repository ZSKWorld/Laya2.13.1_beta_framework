import { eventMgr } from "./EventManager";
import { Notifier } from "./Notifier";

export abstract class Observer extends Notifier {
    protected __eventMap: KeyMap<Function[]>;

    public constructor() {
        super();
        eventMgr.registerEvent(this);
    }

    protected removeEvent(eventName: string, caller: any, callback: Function) {
        eventMgr.off(eventName, caller, callback);
    }

    protected removeAllEvent() {
        eventMgr.offAllCaller(this);
    }
}
