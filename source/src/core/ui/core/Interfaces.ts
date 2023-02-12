import { UserDataType } from "../../userData/UserData";
import { BaseProxy } from "./BaseProxy";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { Layer } from "./GameLayer";
import { ViewID } from "./ViewID";

export const enum ViewEvent {
	/** 页面前置事件 */
	OnForeground = "OnForeground",
	/** 页面后置事件 */
	OnBackground = "OnBackground",
}

export interface GComponentExtend {
	/**
	 * 打开页面
	 * @param viewId {@link ViewID} 页面id
	 * @param data 传入参数
	 * @param callback {@link Laya.Handler} 打开后回调
	 * @param hideTop 是否隐藏上一页面
	 */
	addView?<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop?: boolean): void;

	/**移除最上层页面 */
	removeTopView?(): void;

	/**移除所有页面 */
	removeAllView?(): void;

	/** 移除页面
	 * @param viewId {@link ViewID} 页面id
	 */
	removeView?(viewId: ViewID): void;
}

/**开放给页面和控制器的页面方法 */
interface IViewExtend extends GComponentExtend {
	readonly viewId?: ViewID;
	userData?: UserDataType;

	/**派发全局事件 */
	dispatch?(eventName: string, data?: any): void;

	/** 添加页面消息监听 */
	addMessage?(type: string, callback: Function, args?: any[], once?: boolean): void;

	/** 派发页面消息 */
	sendMessage?(type: string, data?: any): void;

	/** 移除当前页面 */
	removeSelf?(): void;

	/** 打开动画 */
	showOpenAni?(): Promise<void>;

	/** 关闭动画 */
	showCloseAni?(): Promise<void>;
}

/**页面实例类型 */
export type IView = fgui.GComponent & ViewExtension;

/**页面类类型 */
export interface IView_Class {
	new(): IView;
	readonly PkgRes?: string;
	createInstance?(): IView;
};

/**页面扩展 */
export interface ViewExtension extends IViewExtend {
	readonly layer?: Layer;
	readonly CtrlClass?: IViewCtrl_Class;
	listener?: Laya.EventDispatcher;

	/**
	 * 页面创建完毕之后执行，只执行一次。
	 * 该方法为虚方法，使用时重写即可
	 */
	onCreate?(): void;

	/**
	 * @description 初始化页面
	 * @param viewInst {@link IView} 初始对象，没有是初始自己
	 */
	initView?(viewInst?: IView): IViewCtrl;
};

/**页面控制器实例类型 */
export type IViewCtrl = BaseViewCtrl & ViewCtrlExtension;

/**页面控制器类类型 */
export type IViewCtrl_Class = Class<IViewCtrl>;

/**页面控制器扩展 */
export interface ViewCtrlExtension extends IViewExtend {
	readonly ProxyClass: IProxy_Class;

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
};

export type IProxy = BaseProxy;

export type IProxy_Class = Class<IProxy>;
