declare interface INotifier {
    /**
     * 派发事件。
     * @param eventName 事件类型。
     * @param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；
     * 如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     */
    dispatch(eventName: string, data?: any): void;
}

declare interface IEventManager extends Laya.EventDispatcher {
    /**注册监听事件 */
    registerEvent(caller: any): void;
}