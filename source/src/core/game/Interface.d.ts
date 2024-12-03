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
    static create(name: string, enable?: boolean): Logger;
    static setEnable(enable: boolean): void;
    static log(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
    static assert(assert: boolean, tipText?: string): void;
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