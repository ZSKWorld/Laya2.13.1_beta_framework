/** 事件监听器 */
class EventListener extends Laya.EventDispatcher {

    /**注册监听事件 */
    registerNotify(caller: any) {
        if (!caller) return;
        const interestNotifyList = caller.__interestNotifyList;
        if (interestNotifyList) {
            for (const notifyName in interestNotifyList) {
                const callbackList = interestNotifyList[ notifyName ];
                for (const k in callbackList) {
                    const callback: any = callbackList[ k ];
                    const param = callback[ notifyName ];
                    const once = param ? param.__once : false;
                    const args = param ? param.__args : null;
                    if (once) {
                        this.once(notifyName, caller, callback, args);
                    } else {
                        this.on(notifyName, caller, callback, args);
                    }
                }
            }
        }
    }

}

/** 全局事件中心 */
export const eventMgr = new EventListener();
windowImmit("eventCenter", eventMgr)

/**
 * @description: 添加全局事件监听
 * @param notifyName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
export function InsertNotify(notifyName: string, once?: boolean, args?: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__interestNotifyList) target.__interestNotifyList = {};
        if (!target.__interestNotifyList[ notifyName ]) target.__interestNotifyList[ notifyName ] = [];

        const func = descriptor.value;
        const list: Function[] = target.__interestNotifyList[ notifyName ];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[ notifyName ] = func[ notifyName ] || {};
                func[ notifyName ].__once = once;
            }
            if (args) {
                func[ notifyName ] = func[ notifyName ] || {};
                func[ notifyName ].__args = args;
            }
        }
    };
}
