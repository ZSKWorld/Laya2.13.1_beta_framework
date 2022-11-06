import { eventMgr } from "./EventMgr";
import { Notifier } from "./Notifier";

/**
 * 一个简单的观察者
 * @author wizardc
 */
export abstract class Observer extends Notifier {
    private __interestEventList: { [ key: string ]: Function[] };

    public constructor() {
        super();
        eventMgr.registerEvent(this);
    }

    protected removeEvent(eventName: string, caller: any, callback: Function): void {
        eventMgr.off(eventName, caller, callback);
    }

    protected removeAllEvent() {
        eventMgr.offAllCaller(this);
    }
}
