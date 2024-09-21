declare const userData: IUser;
declare const cfgMgr: ICfgManager;
declare const loadMgr: ILoadManager;
declare const skeletonMgr: ISkeletonMgr;
declare const eventMgr: IEventManager;
declare const uiMgr: IUIManager;

/** 注入全局变量 */
declare function WindowImmit(name: string, obj: any): void;
/**
 * 确认弹窗
 * @param title
 * @param msg
 * @param cancel 默认true
 */
declare function ShowConfirm(title: string, msg: string, cancel?: boolean): Promise<boolean>;

/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param cls 要扩展的类
 * @returns 扩展后的类
 */
declare function ExtensionClass<E, T>(cls: Class<T>): Class<T & E>;

/**
 * @description: 添加全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function RegisterEvent(eventName: string, once?: boolean, args?: any[]): MethodDecorator;