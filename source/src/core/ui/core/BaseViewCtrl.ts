import { ViewCtrlDIExtend } from "./ViewCtrlDIExtend";

/**
 * UI控制器脚本基类，用来处理页面各种逻辑，刷新逻辑在页面View中执行，可挂在任何Laya.Node（GUI的displayObject）上。
 * 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => ViewKeyEvent、ViewMouseEvent
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

	override onOpenAni() { return Promise.resolve(); }
	override onCloseAni() { return Promise.resolve(); }
	override addMessage(type: string, listener: Function, args?: any[], once?: boolean) {
		if (once) this.listener.once(type, this, listener, args);
		else this.listener.on(type, this, listener, args);
	}
	override removeMessage(type: string, listener: Function, onceOnly?: boolean) {
		this.listener.off(type, this, listener, onceOnly);
	}
	override sendMessage(type: string, data?: any) {
		this.listener.event(type, data);
	}

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
		ViewCtrlDIExtend.offDeviceEvent(this);
	}

	/** Laya.Script私有方法重写 */
	private _onAdded() {
		this._view = this.owner["$owner"];
		this._listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		if (this.ProxyClass) {
			this._proxy = Laya.Pool.createByClass(this.ProxyClass);
			this._proxy.viewCtrl = this;
		}
		this._registerMessage();
		ViewCtrlDIExtend.registerDeviceEvent(this);
		super["_onAdded"]();
	}

	/** Laya.Script私有方法重写 */
	private _onEnable() {
		eventMgr.registerEvent(this);
		eventMgr.registerEvent(this._view);
		eventMgr.registerEvent(this._proxy);
		super["_onEnable"]();
	}

	/** Laya.Script私有方法重写 */
	private _onDisable() {
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(this._view);
		eventMgr.offAllCaller(this._proxy);
		super["_onDisable"]();
	}

	/** 注册页面消息 */
	private _registerMessage() {
		const { __messageMap } = this;
		if (__messageMap) {
			for (const messageName in __messageMap) {
				const callbackMap = __messageMap[messageName];
				for (const k in callbackMap) {
					const callback = callbackMap[k];
					const param = callback[messageName];
					const once = param ? param.__once : false;
					const args = param ? param.__args : null;
					this.addMessage(messageName, callback, args, once);
				}
			}
		}
	}
}
