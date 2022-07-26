import { eventMgr } from "../../libs/event/EventMgr";
import { INotifier } from "../../libs/event/Notifier";
import { ExtensionClass } from "../../libs/utils/Util";
import { ViewCtrlExtension } from "./interfaces";
import { DIViewCtrl, ViewCtrlDIExtend } from "./ViewCtrlDIExtend";

/**
 * @Author       : zsk
 * @Date         : 2021-08-20 21:36:21
 * @LastEditors  : zsk
 * @LastEditTime : 2022-07-24 20:33:35
 * @Description  : UI控制器脚本基类，可挂在任何Laya.Node（GUI的displayObject）上,该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InsertKeyEvent、InsertMouseEvent
 */
export abstract class BaseViewCtrl<V extends fgui.GComponent = fgui.GComponent, D = any> extends ExtensionClass<ViewCtrlExtension, Laya.Script>(Laya.Script) implements INotifier {
	/** 页面数据 */
	data: D;
	/** 控制器挂载的ui页面 */
	private _view: V;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;

	get view() { return this._view; }

	get listener() { return this._listener || (this._listener = Laya.Pool.createByClass(Laya.EventDispatcher)); }

	set listener(value: Laya.EventDispatcher) {
		if ( value ) {
			if ( this._listener ) {
				this._listener.offAll();
				Laya.Pool.recoverByClass(this._listener);
			}
			this._listener = value;
		}
	}

	onAwake() {
		this._view = this.owner[ "$owner" ];
		eventMgr.registerNotify(this);
		eventMgr.registerNotify(this._view);
		ViewCtrlDIExtend.registerDeviceEvent(this);
	}

	/**
	 * 添加页面消息监听
	 * @param type 消息类型
	 * @param callback 回调函数
	 * @param args 参数
	 */
	addMessageListener(type: string, callback: Function, args?: any[]) {
		!this.destroyed && this.listener.on(type, this, callback, args);
	}

	/**
	 * 封装一个派发全局事件的接口，避免eventMgr过度引用
	 * @param notifyName 事件名称
	 * @param data 参数
	 */
	dispatch(notifyName: string, data?: any) {
		eventMgr.event(notifyName, data);
	}

	onReset() {
		const { _view, _listener } = this;
		Laya.timer.clearAll(this);
		Laya.timer.clearAll(_view);
		Laya.Tween.clearAll(this);
		Laya.Tween.clearAll(_view);
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(_view);
		_listener?.offAll();
		Laya.Pool.recoverByClass(_listener);
		this._view = null;
		this.data = null;
		this._listener = null;
		ViewCtrlDIExtend.offDeviceEvent(this);
	}
}

/** 按键事件类型 */
export const enum KeyEventType {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}

/** 鼠标事件类型 */
export const enum MouseEventType {
	Mouse_Down = "mousedown",
	Mouse_Move = "mousemove",
	Mouse_Out = "mouseout",
	Mouse_Over = "mouseover",
	Mouse_Up = "mouseup",
}

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType 事件类型
 * @param key 触发事件的键值
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function InsertKeyEvent(keyEventType: KeyEventType, key: number, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if ( !target.__keyEventList ) target.__keyEventList = {};
		if ( !target.__keyEventList[ keyEventType ] ) target.__keyEventList[ keyEventType ] = {};
		if ( !target.__keyEventList[ keyEventType ][ key ] ) target.__keyEventList[ keyEventType ][ key ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__keyEventList[ keyEventType ][ key ];
		if ( list.includes(func) == false ) {
			list.push(func);
			if ( once ) {
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
export function InsertMouseEvent(mouseEventType: MouseEventType, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if ( !target.__mouseEventList ) target.__mouseEventList = {};
		if ( !target.__mouseEventList[ mouseEventType ] ) target.__mouseEventList[ mouseEventType ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__mouseEventList[ mouseEventType ];
		if ( list.includes(func) == false ) {
			list.push(func);
			if ( once ) {
				func[ mouseEventType ] = func[ mouseEventType ] || {};
				func[ mouseEventType ].__once = true;
			}
		}
	}
}
