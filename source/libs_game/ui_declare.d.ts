

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
    Game = "Game",
    Bottom = "Bottom",
    Middle = "Middle",
    Top = "Top",
    Dialog = "Dialog",
    Alert = "Alert",
    Lock = "Lock",
}

/**页面及控制器扩展 */
declare interface IViewExtend {
    readonly viewId: ViewID;

    /**派发全局事件 */
    dispatch(eventName: string, data?: any): void;

    /** 添加页面消息监听 */
    addMessage(type: string, callback: Function, args?: any[], once?: boolean): void;

    /** 移除页面消息 */
    removeMessage(type: string, listener: Function, onceOnly?: boolean): void;

    /** 派发页面消息 */
    sendMessage(type: string, data?: any): void;

    /** 创建页面
     * @param viewId 页面id
     * @param fullScreen 是否全屏 默认：false
     */
    createView(viewId: ViewID, fullScreen?: boolean): IViewCtrl;

    /**
     * 打开页面
     * @param viewId 页面id
     * @param data 传入参数
     * @param callback 打开后回调
     */
    showView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler): void;

    /**移除最上层页面 */
    removeTopView(): void;

    /**移除所有页面 */
    removeAllView(): void;

    /** 移除页面
     * @param viewId 页面id
     */
    removeView(viewId: ViewID): void;

    /** 移除当前页面，只有UI界面才能移除自身，其他Com，Btn，Render之类的无效 */
    removeSelf(): void;
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
    readonly ProxyClass: Class<IViewProxy>;

    /**
     * 每次面板前置调用该方法，onEnable之后调用。
     * 该方法为虚方法，使用时重写即可
     */
    onForeground(): void;

    /**
     * 每次面板后置调用该方法，onDisable之后调用。
     * 该方法为虚方法，使用时重写即可
     */
    onBackground(): void;

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