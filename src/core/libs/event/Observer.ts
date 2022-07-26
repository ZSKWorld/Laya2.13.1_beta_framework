import { Notifier } from "./Notifier";
import { eventMgr } from "./EventMgr";

/**
 * 一个简单的观察者
 * @author wizardc
 */
export abstract class Observer extends Notifier {
    private __interestNotifyList: { [key: string]: Function[] };

    public constructor() {
        super();
        eventMgr.registerNotify(this);
    }

    public removeNotify(notifyName: string, caller: any, callback: Function): void {
        eventMgr.off(notifyName, caller, callback);
    }

    public removeAllNotify() {
        eventMgr.offAllCaller(this);
    }
}
