import { eventMgr } from "../../libs/event/EventMgr";
import { Logger } from "../../libs/utils/Logger";
import { ExtensionClass } from "../../libs/utils/Util";
import { INetProcessor, IView, ViewCtrlExtension, ViewEvent } from "./Interfaces";
import { NetProcessorClass } from "./UIGlobal";
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
	/** 页面是否显示中 */
	private _isShow: boolean;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;
	/** 处理控制器网络回包 */
	private _netProcessor: INetProcessor;
	/** 子页面控制器集合 */
	private _subCtrls: BaseViewCtrl[] = [];

	get view() { return this._view; }
	get isShow() { return !!this._isShow; }
	get listener() { return this._listener; }
	set listener(value: Laya.EventDispatcher) {
		if (value && value != this._listener) {
			if (this._listener) {
				this._listener.offAll();
				Laya.Pool.recoverByClass(this._listener);
			}
			this._listener = value;
		}
	}
	get netProcessor() { return this._netProcessor; }
	get subCtrls() { return this._subCtrls; }

	/**
	 * 封装一个派发全局事件的接口，避免eventMgr过度引用
	 * @param notifyName 事件名称
	 * @param data 参数
	 */
	override dispatch(notifyName: string, data?: any) {
		eventMgr.event(notifyName, data);
	}

	override onReset() {
		const { _view, _listener, _subCtrls, _netProcessor } = this;
		this.data = null;
		this._view = null;
		this._listener = null;
		_netProcessor.destroy();
		this._netProcessor = null;
		_subCtrls.length = 0;
		_listener?.offAll();
		Laya.timer.clearAll(this);
		Laya.timer.clearAll(_view);
		Laya.timer.clearAll(_netProcessor);
		Laya.Tween.clearAll(this);
		Laya.Tween.clearAll(_view);
		Laya.Tween.clearAll(_netProcessor);
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(_view);
		eventMgr.offAllCaller(_netProcessor);
		Laya.Pool.recoverByClass(_netProcessor);
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
	protected addMessageListener(type: string, callback: Function, args?: any[], once?: boolean) {
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

	private _onAdded() {
		this._view = this.owner[ "$owner" ];
		logger.assert(!this._listener, "_listener未清除");
		this._listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		logger.assert(!this._netProcessor, "_netProcessor未清除");
		this._netProcessor = Laya.Pool.createByClass(NetProcessorClass[ this.viewId ]);
		this._netProcessor.viewCtrl = this;
		eventMgr.registerNotify(this);
		eventMgr.registerNotify(this._view);
		eventMgr.registerNotify(this._netProcessor);
		ViewCtrlDIExtend.registerDeviceEvent(this);
		this.addMessageListener(ViewEvent.OnRemoved, this.__onRemoved);
		this.addMessageListener(ViewEvent.OnForeground, this.__onForeground);
		this.addMessageListener(ViewEvent.OnBackground, this.__onBackground);
	}

	private _onEnable() {
		this._isShow = true;
		super[ "_onEnable" ]();
	}

	private _onDisable() {
		this._isShow = false;
		super[ "_onDisable" ]();
	}

	private __onForeground() {
		this.onForeground();
		this._subCtrls.forEach(v => v.__onForeground());
	}

	private __onBackground() {
		this.onBackground();
		this._subCtrls.forEach(v => v.__onBackground());
	}

	private __onRemoved() {
		this._subCtrls.forEach(v => v.__onRemoved());
		this.destroy();
	}
}
windowImmit("BaseViewCtrl", BaseViewCtrl);

/** 按键事件类型 */
export const enum KeyEvent {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}

/** 鼠标事件类型 */
export const enum MouseEvent {
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
 * @param keyEventType {@link KeyEvent} 事件类型
 * @param key 触发事件的键值
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function InsertKeyEvent(keyEventType: KeyEvent, key: number, once?: boolean) {
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
export function InsertMouseEvent(mouseEventType: MouseEvent, once?: boolean) {
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
