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
	/** 子页面控制器集合 */
	private _subCtrls: Set<IViewCtrl>;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;
	private __messageMap: { [ name: string ]: Function[] };

	override get isSingleton() { return true; };
	get view() { return this._view; }
	get listener() { return this._listener; }

	/** 添加子页面 */
	addChildCtrl(child: IViewCtrl) {
		if (!this._subCtrls)
			this._subCtrls = new Set<IViewCtrl>();
		child._listener = this._listener;
		this._subCtrls.add(child);
	}

	/** 发送页面事件 */
	override sendMessage(type: string, data?: any) {
		this._listener.event(type, data);
	}

	/**
	 * 封装一个派发全局事件的接口，避免eventMgr过度引用
	 * @param eventName 事件名称
	 * @param data 参数
	 */
	override dispatch(eventName: string, data?: any) {
		eventMgr.event(eventName, data);
	}

	override onReset() {
		const { _view, _listener, _subCtrls, _proxy } = this;
		_listener?.offAll();
		_subCtrls?.clear();
		_proxy?.destroy();
		this.data = null;
		this._view = null;
		this._listener = null;
		this._proxy = null;
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(_view);
		eventMgr.offAllCaller(_proxy);
		Laya.timer.clearAll(this);
		Laya.timer.clearAll(_view);
		Laya.timer.clearAll(_proxy);
		Laya.Tween.clearAll(this);
		Laya.Tween.clearAll(_view);
		Laya.Tween.clearAll(_proxy);
		Laya.Pool.recoverByClass(_proxy);
		Laya.Pool.recoverByClass(_listener);
		ViewCtrlDIExtend.offDeviceEvent(this);
	}

	/**
	 * 添加页面消息监听
	 * @param type 消息类型
	 * @param callback 回调函数
	 * @param args 参数
	 * @param once 是否只执行一次，默认 false
	 */
	protected addMessage(type: string, callback: Function, args?: any[], once?: boolean) {
		if (once) this._listener.once(type, this, callback, args);
		else this._listener.on(type, this, callback, args);
	}

	/** 
	 * 每次面板前置调用该方法，onEnable之后调用。
	 * 该方法为虚方法，使用时重写即可
	 */
	protected onForeground(): void { }

	/** 
	 * 每次面板后置调用该方法，onDisable之后调用。
	 * 该方法为虚方法，使用时重写即可
	 */
	protected onBackground(): void { }

	/** Laya.Script私有方法重写 */
	private _onAdded() {
		this._view = this.owner[ "$owner" ];
		this._listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		this._proxy = Laya.Pool.createByClass(this.ProxyClass);
		this._proxy.viewCtrl = this;
		this.registerMessage();
		eventMgr.registerEvent(this);
		eventMgr.registerEvent(this._view);
		eventMgr.registerEvent(this._proxy);
		this.addMessage(ViewEvent.OnForeground, this._onForeground);
		this.addMessage(ViewEvent.OnBackground, this._onBackground);
	}

	private _onEnable() {
		ViewCtrlDIExtend.registerDeviceEvent(this);
		super[ "_onEnable" ]();
	}

	private _onForeground() {
		this.onForeground();
		this._subCtrls?.forEach(v => v._onForeground());
	}

	private _onBackground() {
		this.onBackground();
		this._subCtrls?.forEach(v => v._onBackground());
	}

	private registerMessage() {
		const { __messageMap: messageMap, _listener: listener } = this;
		if (messageMap && listener) {
			for (const messageName in messageMap) {
				const callbackMap = messageMap[ messageName ];
				for (const k in callbackMap) {
					const callback: any = callbackMap[ k ];
					const param = callback[ messageName ];
					const once = param ? param.__once : false;
					const args = param ? param.__args : null;
					if (once) {
						listener.once(messageName, this, callback, args);
					} else {
						listener.on(messageName, this, callback, args);
					}
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
		const list: Function[] = target.__keyEventList[ keyEventType ][ key ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ key ] = func[ key ] || {};
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
		const list: Function[] = target.__mouseEventList[ mouseEventType ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ mouseEventType ] = func[ mouseEventType ] || {};
				func[ mouseEventType ].__once = true;
			}
		}
	}
}

/**
 * 页面控制器消息事件装饰器工厂
 * @param name 消息名称
 * @param once 是否只监听一次
 * @param args 参数
 * @returns MethodDecorator
 */
export function Message(name: string, once?: boolean, args?: any[]) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		if (!target.__messageMap) target.__messageMap = {};
		if (!target.__messageMap[ name ]) target.__messageMap[ name ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__messageMap[ name ];
		if (list.indexOf(func) == -1) {
			list.push(func);
			if (once) {
				func[ name ] = func[ name ] || {};
				func[ name ].__once = once;
			}
			if (args) {
				func[ name ] = func[ name ] || {};
				func[ name ].__args = args;
			}
		}
	};
}
