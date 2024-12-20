/** 事件监听器 */
export class EventManager extends Laya.EventDispatcher implements IEventManager {
    /**注册监听事件 */
    registerEvent(caller: any) {
        if (!caller) return;
        const eventList = caller.__eventMap;
        if (eventList) {
            for (const eventName in eventList) {
                const callbackList = eventList[eventName];
                for (const k in callbackList) {
                    const callback: any = callbackList[k];
                    const param = callback[eventName];
                    const once = param ? param.__once : false;
                    const args = param ? param.__args : null;
                    if (once) {
                        this.once(eventName, caller, callback, args);
                    } else {
                        this.on(eventName, caller, callback, args);
                    }
                }
            }
        }
    }
}
WindowImmit("eventMgr", new EventManager());
