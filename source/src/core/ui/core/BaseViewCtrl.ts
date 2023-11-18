import { eventMgr } from "../../libs/event/EventManager";
import { ViewEvent } from "./UIDefine";
import { DIViewCtrl, ViewCtrlDIExtend } from "./ViewCtrlDIExtend";

/**
 * UI控制器脚本基类，用来处理页面各种逻辑，刷新逻辑在页面View中执行，可挂在任何Laya.Node（GUI的displayObject）上。
 * 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InsertKeyEvent、InsertMouseEvent
 */
export abstract class BaseViewCtrl<V extends IView = IView, D = any> extends ExtensionClass<IViewCtrl, Laya.Script>(Laya.Script) {
	override data: D;
	/** 控制器挂载的ui页面 */
	private _view: V;
	/** 网络代理 */
	private _proxy: IViewProxy;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;
	/** 页面装饰器注册的消息映射 */
	private __messageMap: KeyMap<Function[]>;

	override get isSingleton() { return true; }
	override get name() { return this.constructor.name; }
	override get view() { return this._view; }
	override get listener() { return this._listener; }

	override onReset() {
		const { _listener, _proxy } = this;
		_listener.offAll();
		_proxy?.destroy();
		this.data = null;
		this._view = null;
		this._listener = null;
		this._proxy = null;
		Laya.Pool.recoverByClass(_listener);
		Laya.Pool.recoverByClass(_proxy);
		ViewCtrlDIExtend.OffDeviceEvent(this);
	}

	/** Laya.Script私有方法重写 */
	private _onAdded() {
		this._view = this.owner[ "$owner" ];
		this._listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		if (this.ProxyClass) {
			this._proxy = Laya.Pool.createByClass(this.ProxyClass);
			this._proxy.viewCtrl = this;
		}
		this._registerMessage();
		ViewCtrlDIExtend.RegisterDeviceEvent(this);
		//这里不能用Message装饰器注册消息，不然所有BaseViewCtrl子类会变成共用一个__messageMap
		this.addMessage(ViewEvent.OnForeground, this._onForeground);
		this.addMessage(ViewEvent.OnBackground, this._onBackground);
		super[ "_onAdded" ]();
	}

	/** Laya.Script私有方法重写 */
	private _onEnable() {
		eventMgr.registerEvent(this);
		eventMgr.registerEvent(this._view);
		eventMgr.registerEvent(this._proxy);
		super[ "_onEnable" ]();
	}

	/** Laya.Script私有方法重写 */
	private _onDisable() {
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(this._view);
		eventMgr.offAllCaller(this._proxy);
		super[ "_onDisable" ]();
	}

	private _onForeground() {
		this.onForeground();
	}

	private _onBackground() {
		this.onBackground();
	}

	/** 注册页面消息 */
	private _registerMessage() {
		const { __messageMap } = this;
		if (__messageMap) {
			for (const messageName in __messageMap) {
				const callbackMap = __messageMap[ messageName ];
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

/** 按键事件类型 */
enum KeyEventType {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}
windowImmit("KeyEventType", KeyEventType);

/** 鼠标事件类型 */
enum MouseEventType {
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
windowImmit("MouseEventType", MouseEventType);

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType {@link KeyEventType} 事件类型
 * @param key 触发事件的键值
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
function CtrlKeyEvent(keyEventType: KeyEventType, key: number, once?: boolean, args?: any[]): MethodDecorator {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__keyEventList) target.__keyEventList = {};
		if (!target.__keyEventList[ keyEventType ]) target.__keyEventList[ keyEventType ] = {};
		if (!target.__keyEventList[ keyEventType ][ key ]) target.__keyEventList[ keyEventType ][ key ] = [];

		const func = descriptor.value;
		const list = target.__keyEventList[ keyEventType ][ key ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ key ] = func[ key ] || {};
				func[ key ].__once = true;
			}
			if (args) {
				func[ key ] = func[ key ] || {};
				func[ key ].__args = args;
			}
		}
	}
}
windowImmit("CtrlKeyEvent", CtrlKeyEvent);

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
function CtrlMouseEvent(mouseEventType: MouseEventType, once?: boolean, args?: any[]): MethodDecorator {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__mouseEventList) target.__mouseEventList = {};
		if (!target.__mouseEventList[ mouseEventType ]) target.__mouseEventList[ mouseEventType ] = [];

		const func = descriptor.value;
		const list = target.__mouseEventList[ mouseEventType ];
		if (list.indexOf(func) < 0) {
			list.push(func);
			if (once) {
				func[ mouseEventType ] = func[ mouseEventType ] || {};
				func[ mouseEventType ].__once = once;
			}
			if (args) {
				func[ mouseEventType ] = func[ mouseEventType ] || {};
				func[ mouseEventType ].__args = args;
			}
		}
	}
}
windowImmit("CtrlMouseEvent", CtrlMouseEvent);

/**
 * 页面控制器消息装饰器工厂
 * @param name 消息名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
function CtrlMessage(name: string, once?: boolean, args?: any[]): MethodDecorator {
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
	}
}
windowImmit("CtrlMessage", CtrlMessage);
