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

declare interface ILoadManager {
    load(
        url: string | (string | Laya.loadItem)[],
        complete?: Laya.Handler | null,
        progress?: Laya.Handler | null,
        type?: string | null,
        priority?: number,
        cache?: boolean,
        group?: string | null,
        ignoreCache?: boolean,
        useWorkerLoader?: boolean
    ): Promise<any>;
    create(
        url: string | (string | Laya.createItem)[],
        complete?: Laya.Handler | null,
        progress?: Laya.Handler | null,
        type?: string | null,
        constructParams?: any[] | null,
        propertyParams?: any,
        priority?: number,
        cache?: boolean
    ): Promise<any>;
    loadPackage(resKey: string | string[], complete?: Laya.Handler, progress?: Laya.Handler): Promise<any>;
}

declare class Logger {
    private constructor(name: string, enable?: boolean);
    static Create(name: string, enable?: boolean): Logger;
    static SetEnable(enable: boolean): void;
    static Log(...args: any[]): void;
    static Warn(...args: any[]): void;
    static Error(...args: any[]): void;
    static Assert(assert: boolean, tipText?: string): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    assert(assert: boolean, tipText?: string): void;
}

declare interface ISkeletonMgr {
    /**
     * 加载骨骼动画模板
     * @param urls 动画路径 {@link ResPath.SkeletonPath}[]
     */
    loadSkeleton(urls: string[], progress?: Laya.Handler): Promise<void>;
    /**
     * 获取一个骨骼动画
     * @param url 动画路径 {@link ResPath.SkeletonPath}
     * @param enableSkin 是否开启换装
     */
    createSkeleton(url: string, enableSkin?: boolean): Laya.Skeleton;
    /**
     * 回收骨骼动画到对象池
     */
    recoverSkeleton(skeleton: Laya.Skeleton): void;
    /**
     * 清除动画对象池
     * @param url
     */
    clearSkeletons(url: string): void;
    /**
     * 销毁动画并释放内存
     */
    disposeSkeleton(url: string): void;
}