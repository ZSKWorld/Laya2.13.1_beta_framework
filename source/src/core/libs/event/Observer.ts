import { eventMgr } from "./EventMgr";
import { Notifier } from "./Notifier";

/**
 * 一个简单的观察者
 * @author wizardc
 */
export abstract class Observer extends Notifier {
    private __interestNotifyList: { [ key: string ]: Function[] };

    public constructor() {
        super();
        eventMgr.registerNotify(this);
    }

    protected removeNotify(notifyName: string, caller: any, callback: Function): void {
        eventMgr.off(notifyName, caller, callback);
    }

    protected removeAllNotify() {
        eventMgr.offAllCaller(this);
    }
}
