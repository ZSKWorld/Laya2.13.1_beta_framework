import { eventMgr } from "../../libs/event/EventManager";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { uiMgr } from "./UIManager";

/** 页面及控制器扩展 */
export class ViewExtend {
	static Init() {
		this.FGUIGComponentExtend();
		this.BaseCtrlExtend();
	}

	private static FGUIGComponentExtend() {
		let prototype = fgui.GComponent.prototype as IView;
		prototype.dispatch = function (...args) { eventMgr.event(...args); }
		prototype.sendMessage = function (...args) { (<IView>this).controller.sendMessage(...args); }
		prototype.addMessage = function (type, callback, args?, once?) {
			const _this = <IView>this;
			const controller = _this.controller;
			if (controller) {
				if (once) controller.listener.once(type, _this, callback, args);
				else controller.listener.on(type, _this, callback, args);
			}
		}
		prototype.removeMessage = function (type, listener, onceOnly?) {
			const _this = <IView>this;
			if (_this.controller)
				_this.controller.listener.off(type, _this, listener, onceOnly);
		}
		prototype.createView = function (...args) { return uiMgr.createView(...args); }
		prototype.showConfirm = function (...args) { return uiMgr.showConfirm(...args); }
		prototype.showView = function (...args) { uiMgr.showView(...args); }
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (...args) { uiMgr.removeView(...args); }
		prototype.removeSelf = function () {
			const viewId = (<IView>this).viewId;
			//只有UI界面才能移除自身
			viewId.startsWith("UI") && uiMgr.removeView(viewId);
		}

		const constructFromResource = prototype[ "constructFromResource" ];
		prototype[ "constructFromResource" ] = function () {
			constructFromResource.call(this);
			const viewInst = <IView>this;
			let viewCtrl: IViewCtrl;
			if (viewInst.viewId) {
				const CtrlCls = uiMgr.getCtrlClass(viewInst.viewId);
				viewCtrl = viewInst.getComponent(CtrlCls);
				if (!viewCtrl && CtrlCls) {
					viewCtrl = viewInst.addComponent(CtrlCls);
				}
				viewInst.controller = viewCtrl;
			}
			viewInst.onCreate?.();
		}

		const oldDispose = prototype.dispose;
		prototype.dispose = function () {
			oldDispose.call(this);
			const _this = this as IView;
			_this.controller = null;
		}
	}

	private static BaseCtrlExtend() {
		let prototype = BaseViewCtrl.prototype as IViewCtrl;
		prototype.dispatch = function (...args) { eventMgr.event(...args); }
		prototype.addMessage = function (type, callback, args?, once?) {
			const _this = this as IViewCtrl;
			if (once) _this.listener.once(type, _this, callback, args);
			else _this.listener.on(type, _this, callback, args);
		}
		prototype.removeMessage = function (type, listener, onceOnly?) {
			const _this = this as IViewCtrl;
			_this.listener.off(type, _this, listener, onceOnly);
		}
		prototype.sendMessage = function (...args) { (<IViewCtrl>this).listener.event(...args); }
		prototype.onForeground = function () { }
		prototype.onBackground = function () { }
		prototype.createView = function (...args) { return uiMgr.createView(...args); }
		prototype.showConfirm = function (...args) { return uiMgr.showConfirm(...args); }
		prototype.showView = function (...args) { uiMgr.showView(...args); }
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (...args) { uiMgr.removeView(...args); }
		prototype.removeSelf = function () {
			const viewId = (<IViewCtrl>this).view.viewId;
			//只有UI界面才能移除自身
			viewId.startsWith("UI") && uiMgr.removeView(viewId);
		}
		prototype.onOpenAni = function () { return Promise.resolve(); }
		prototype.onCloseAni = function () { return Promise.resolve(); }
	}
}