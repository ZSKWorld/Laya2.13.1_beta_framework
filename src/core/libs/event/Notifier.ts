/*
 * @Author: your name
 * @Date: 2021-08-25 09:32:54
 * @LastEditTime: 2021-08-31 13:21:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mycat\src\script\game\core\mvc\control\Notifier.ts
 */
import { eventMgr } from "./EventMgr";

/**
 * 消息发送对象
 * @author wizardc
 */
export interface INotifier {
    dispatch(notifyName: string, data?: any): void;
}

/**
 * 简单的消息发送对象
 * @author wizardc
 */
export abstract class Notifier implements INotifier {
    /**
     * 派发事件。
     * @param notifyName 事件类型。
     * @param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；
     * 如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     */
    public dispatch(notifyName: string, data?: any): void {
        eventMgr.event(notifyName, data);
    }
}
