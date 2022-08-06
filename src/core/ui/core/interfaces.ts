import { IPlayerData } from "../../playerData/PlayerData";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { Layer } from "./GameLayer";
import { ViewID } from "./ViewID";

/**页面状态 */
interface IViewStateMethod {
	/**进入前台时执行 */
	// onForeground?(): void;
	/**进入后台时执行 */
	// onBackground?(): void;
}

/**开放给页面和控制器的页面方法 */
interface IViewMethod {
	/** 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数
	 * @param callback 打开后回调
	 * @param hideTop 是否隐藏上一页面
	 */
	addView?<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop?: boolean): void;

	/**移除最上层页面 */
	removeTop?(): void;

	/**移除所有页面 */
	removeAll?(): void;

	/** 移除页面
	 * @param viewId 页面id
	 */
	removeView?(viewId: ViewID): void;
}

/**页面实例类型 */
export type IView = fgui.GComponent & ViewExtension;

/**页面类类型 */
export interface IView_Class {
	new(): IView;
	PkgRes?: string;
	/** 是否不可销毁 */
	DontDestroy?: boolean;
	createInstance?(): IView;
};

/**页面扩展 */
export interface ViewExtension extends IViewMethod, IViewStateMethod {
	layer?: Layer;
	userData?: IPlayerData;
	listener?: Laya.EventDispatcher;

	/**页面创建完毕之后执行，只执行一次, 该方法为虚方法，使用时重写即可 */
	onCreate?(): void;

	/**向控制器发送消息 */
	sendMessage?(type: string, data?: any): void;

	/**派发全局事件 */
	dispatch?(notifyName: string, data?: any): void;

	/**
	 * @description 初始化页面
	 * @param viewId 页面ID
	 * @param viewInst 组件页面对象
	 * @param listener 事件监听器
	 */
	initView?(viewId: ViewID, viewInst: IView, listener: Laya.EventDispatcher, data?: any): void;
};


/**页面控制器实例类型 */
export type IViewCtrl = BaseViewCtrl & ViewCtrlExtension;

/**页面控制器类类型 */
export type IViewCtrl_Class = new () => IViewCtrl;

/**页面控制器扩展 */
export interface ViewCtrlExtension extends IViewMethod, IViewStateMethod {
	userData?: IPlayerData;
};
