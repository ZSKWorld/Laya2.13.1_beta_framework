import { eventMgr } from "../../libs/event/EventMgr";
import { Logger } from "../../libs/utils/Logger";
import { ExtensionClass } from "../../libs/utils/Util";
import { IProxy, IView, IViewCtrl, ViewCtrlExtension, ViewEvent } from "./Interfaces";
import { DIViewCtrl, ViewCtrlDIExtend } from "./ViewCtrlDIExtend";

const logger = Logger.Create("BaseViewCtrl", true);

/**
 * UI控制器脚本基类，用来处理页面各种逻辑，刷新逻辑在页面View中执行，可挂在任何Laya.Node（GUI的displayObject）上。
 * 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InsertKeyEvent、InsertMouseEvent
 */
export abstract class BaseViewCtrl<V extends IView = IView, D = any> extends ExtensionClass<ViewCtrlExtension, Laya.Script>(Laya.Script) {
	/** 页面数据 */
	data: D;
	/** 控制器挂载的ui页面 */
	private _view: V;
	/** 处理控制器网络回包代理 */
	private _proxy: IProxy;
	/** 是否正在显示 */
	private _isShow: boolean;
	/** 父页面控制器 */
	private _parent: IViewCtrl;
	/** 子页面控制器集合 */
	private _children: Set<IViewCtrl>;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;
	/** 页面装饰器注册的消息映射 */
	private __messageMap: KeyMap<Function[]>;

	override get isSingleton() { return true; }
	get view() { return this._view; }
	get parent() { return this._parent; }
	get isShow() { return this._isShow; }
	get listener() { return this._listener; }

	/** 添加子页面 */
	addChildCtrl(child: IViewCtrl) {
		if (child === this) return;
		let { _children: children } = this;
		if (!children)
			children = this._children = new Set<IViewCtrl>();
		if (children.has(child) == false) {
			child._parent = this;
			if (child._listener) {
				Laya.Pool.recoverByClass(child._listener.offAllCaller(child));
			}
			child._listener = this._listener;
			child._registerMessage();
			children.add(child);
		}
	}

	override onAdded() {
		this._view = this.owner[ "$owner" ];
		this._listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		this._proxy = Laya.Pool.createByClass(this.ProxyClass);
		this._proxy.viewCtrl = this;
		this._registerMessage();
		eventMgr.registerEvent(this);
		eventMgr.registerEvent(this._view);
		eventMgr.registerEvent(this._proxy);
		//这里不能用Message装饰器注册消息，不然所有BaseViewCtrl子类会变成共用一个__messageMap
		this.addMessage(ViewEvent.OnForeground, this._onForeground);
		this.addMessage(ViewEvent.OnBackground, this._onBackground);
	}

	override onReset() {
		const { _view, _listener, _children, _proxy } = this;
		_listener?.offAll();
		_children?.clear();
		_proxy?.destroy();
		this.data = null;
		this._view = null;
		this._listener = null;
		this._proxy = null;
		this._parent = null;
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(_view);
		eventMgr.offAllCaller(_proxy);
		Laya.Pool.recoverByClass(_proxy);
		Laya.Pool.recoverByClass(_listener);
		ViewCtrlDIExtend.offDeviceEvent(this);
	}

	/** Laya.Script私有方法重写 */
	private _onEnable() {
		this._isShow = true;
		ViewCtrlDIExtend.registerDeviceEvent(this);
		super[ "_onEnable" ]();
	}

	/** Laya.Script私有方法重写 */
	private _onDisable() {
		this._isShow = false;
		super[ "_onDisable" ]();
	}

	private _onForeground() {
		if (!this._isShow) return;
		this.onForeground();
		this._children?.forEach(v => v._onForeground());
	}

	private _onBackground() {
		if (!this._isShow) return;
		this.onBackground();
		this._children?.forEach(v => v._onBackground());
	}

	/** 注册装饰器页面消息 */
	private _registerMessage() {
		const { __messageMap: messageMap } = this;
		if (messageMap) {
			for (const messageName in messageMap) {
				const callbackMap = messageMap[ messageName ];
				for (const k in callbackMap) {
					const callback = callbackMap[ k ];
					const param = callback[ messageName ];
					const once = param ? param.__once : false;
					const args = param ? param.__args : null;
					this.addMessage(messageName, callback, args, once);
				}
			}
		}
	}
}
windowImmit("BaseViewCtrl", BaseViewCtrl);

/** 按键事件类型 */
export const enum KeyEventType {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}

/** 鼠标事件类型 */
export const enum MouseEventType {
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

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType {@link KeyEventType} 事件类型
 * @param key 触发事件的键值
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function KeyEvent(keyEventType: KeyEventType, key: number, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__keyEventList) target.__keyEventList = {};
		if (!target.__keyEventList[ keyEventType ]) target.__keyEventList[ keyEventType ] = {};
		if (!target.__keyEventList[ keyEventType ][ key ]) target.__keyEventList[ keyEventType ][ key ] = [];

		const func = descriptor.value;
		const list = target.__keyEventList[ keyEventType ][ key ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ key ] ||= {};
				func[ key ].__once = true;
			}
		}
	}
}                   

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function MouseEvent(mouseEventType: MouseEventType, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__mouseEventList) target.__mouseEventList = {};
		if (!target.__mouseEventList[ mouseEventType ]) target.__mouseEventList[ mouseEventType ] = [];

		const func = descriptor.value;
		const list = target.__mouseEventList[ mouseEventType ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ mouseEventType ] ||= {};
				func[ mouseEventType ].__once = once;
			}
		}
	}
}

/**
 * 页面控制器消息装饰器工厂
 * @param name 消息名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
export function ViewMessage(name: string, once?: boolean, args?: any[]) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		if (!target.__messageMap) target.__messageMap = {};
		if (!target.__messageMap[ name ]) target.__messageMap[ name ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__messageMap[ name ];
		if (list.indexOf(func) == -1) {
			list.push(func);
			if (once) {
				func[ name ] ||= {};
				func[ name ].__once = once;
			}
			if (args) {
				func[ name ] ||= {};
				func[ name ].__args = args;
			}
		}
	};
}
