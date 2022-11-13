/** 事件监听器 */
class EventListener extends Laya.EventDispatcher {

    /**注册监听事件 */
    registerEvent(caller: any) {
        if (!caller) return;
        const eventList = caller.__interestEventList;
        if (eventList) {
            for (const eventName in eventList) {
                const callbackList = eventList[ eventName ];
                for (const k in callbackList) {
                    const callback: any = callbackList[ k ];
                    const param = callback[ eventName ];
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

/** 全局事件中心 */
export const eventMgr = new EventListener();
windowImmit("eventMgr", eventMgr)

/**
 * @description: 添加全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
export function InsertEvent(eventName: string, once?: boolean, args?: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__interestEventList) target.__interestEventList = {};
        if (!target.__interestEventList[ eventName ]) target.__interestEventList[ eventName ] = [];

        const func = descriptor.value;
        const list: Function[] = target.__interestEventList[ eventName ];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[ eventName ] = func[ eventName ] || {};
                func[ eventName ].__once = once;
            }
            if (args) {
                func[ eventName ] = func[ eventName ] || {};
                func[ eventName ].__args = args;
            }
        }
    };
}
