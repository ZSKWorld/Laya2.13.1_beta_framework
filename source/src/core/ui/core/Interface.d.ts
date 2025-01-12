declare type IViewClass = Class<IView> & { createInstance?(): IView, readonly pkgRes?: string };
declare type IViewCtrlClass = Class<IViewCtrl>;
declare type IViewProxyClass = Class<IViewProxy>;

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType 事件类型
 * @param key 触发事件的键值，-1 所有键都可以触发，默认-1
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function ViewKeyEvent(keyEventType: KeyEventType, key?: number, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function ViewMouseEvent(mouseEventType: MouseEventType, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 页面控制器消息装饰器工厂
 * @param name 消息名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
declare function ViewMessage(name: string, once?: boolean, args?: any[]): MethodDecorator;

/** 按键事件类型 */
declare enum KeyEventType {
    KeyDown = "keydown",
    KeyPress = "keypress",
    KeyUp = "keyup",
}

/** 鼠标事件类型 */
declare enum MouseEventType {
    MouseOver = "mouseover",
    MouseDown = "mousedown",
    MouseMove = "mousemove",
    MouseUp = "mouseup",
    MouseOut = "mouseout",
    DoubleClick = "doubleclick",
    RightClick = "rightclick",
    Click = "click",
    StageMouseDown = "stagemousedown",
    StageMouseMove = "stagemousemove",
    StageMouseUp = "stagemouseup",
    StageClick = "stageclick",
}

declare enum Layer {
    Scene = "Scene",
    UIBottom = "UIBottom",
    UIMiddle = "UIMiddle",
    UITop = "UITop",
    Dialog = "Dialog",
    Alert = "Alert",
    Lock = "Lock",
}

interface IViewMethod {
    /** 创建页面
     * @param viewId 页面id
     * @param fullScreen 是否全屏 默认：false
     */
    createView(viewId: ViewID, fullScreen?: boolean): IViewCtrl;

    /**
     * 打开页面
     * @param viewId 页面id
     * @param data 传入参数
     */
    showView<T = any>(viewId: ViewID, data?: T): Promise<void>;

    /** 移除页面
     * @param viewId 页面id
     */
    removeView(viewId: ViewID): void;
}

/**页面及控制器扩展 */
declare interface IViewExtend extends IViewMethod {
    readonly viewId: ViewID;

    /**
     * 派发全局事件
     * @param eventName 
     * @param data （可选）回调数据。注意：如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     */
    dispatch(eventName: string, data?: any): void;

    /** 添加页面消息监听 */
    addMessage(type: string, callback: Function, args?: any[], once?: boolean): void;

    /** 移除页面消息 */
    removeMessage(type: string, listener: Function, onceOnly?: boolean): void;

    /** 派发页面消息 */
    sendMessage(type: string, data?: any): void;

    /** 移除当前页面，只有UI界面才能移除自身，其他Com，Btn，Render之类的无效 */
    removeSelf(): void;

    getPath(): string;
}

/**页面实例类型 */
declare interface IView extends fgui.GComponent, IViewExtend {
    readonly layer: Layer;
    viewCtrl: IViewCtrl;

    /**
     * 页面创建完毕之后执行，只执行一次。
     * 该方法为虚方法，使用时重写即可
     */
    onCreate(): void;
}

/**页面控制器实例类型 */
declare interface IViewCtrl<V extends IView = IView, D = any> extends Laya.Script, IViewExtend {
    /** 页面数据 */
    data: D;
    get name(): string;
    /** 控制器挂载的ui页面 */
    get view(): V;
    /** 页面消息监听器 */
    get listener(): Laya.EventDispatcher;
    /** 网络代理类 */
    readonly ProxyClass: IViewProxyClass;

    /**
     * 页面打开动画
     * 该方法为虚方法，使用时重写即可
     */
    onOpenAni(): Promise<void>;

    /**
     * 页面关闭动画
     * 该方法为虚方法，使用时重写即可
     */
    onCloseAni(): Promise<void>;
}

declare interface IViewProxy<T extends IViewCtrl = IViewCtrl> {
    /** 代理的控制器，只读 */
    viewCtrl: T;
    sendMessage(type: string, data?: any): void;
    destroy(): void;
}

declare interface IUIManager extends INotifier, IViewMethod {
    init(): void;
    registView(viewId: ViewID, viewCls: IViewClass, ctrlCls?: IViewCtrlClass, proxyCls?: IViewProxyClass): void;
    getViewClass(viewId: ViewID): IViewClass;
    getCtrlClass(viewId: ViewID): IViewCtrlClass;
    getProxyClass(viewId: ViewID): IViewProxyClass;

    /** 是否是最顶层ui */
    isTopView(view: IViewCtrl | IView): boolean;

    /** 移除顶层页面 */
    removeTopView(): void;

    /** 移除所有页面 */
    removeAllView(): void;

    destroyView(viewId: ViewID): void;
}