import { eventMgr } from "../../libs/event/EventManager";
import { userData } from "../../userData/UserData";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { IView, IViewCtrl } from "./Interfaces";
import { uiMgr } from "./UIManager";

/** 页面及控制器扩展 */
export class ViewExtend {
	static Init() {
		this.FGUIGComponentExtend();
		this.BaseCtrlExtend();
	}

	private static FGUIGComponentExtend() {
		let prototype = fgui.GComponent.prototype as IView;
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); }
		prototype.sendMessage = function (type, data) { (<IView>this).listener.event(type, data); }
		prototype.addMessage = function (type, callback, args?, once?) {
			const _this = this as IView;
			if (once) _this.listener.once(type, _this, callback, args);
			else _this.listener.on(type, _this, callback, args);
		}
		prototype.addView = function (viewId, data, callback, hideTop) {
			uiMgr.addView(viewId, data, callback, hideTop);
		}
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); }
		prototype.removeSelf = function () {
			const viewId = (<IView>this).viewId;
			//只有UI界面才能移除自身
			viewId.startsWith("UI") && uiMgr.removeView(viewId);
		}
		prototype.onOpenAni = function () {
			return Promise.resolve();
		}
		prototype.onCloseAni = function () {
			return Promise.resolve();
		}

		const initView = function (viewInst: IView, parentCtrl: IViewCtrl = null) {
			let viewCtrl: IViewCtrl;
			if (viewInst.viewId) {
				viewCtrl = viewInst.getComponent(viewInst.CtrlClass);
				if (!viewCtrl) {
					viewCtrl = viewInst.addComponent(viewInst.CtrlClass);
					viewCtrl.userData = userData;
					viewInst.userData = userData;
					viewInst.listener = viewCtrl.listener;
				}
				if (parentCtrl && parentCtrl != viewCtrl.parent) parentCtrl.addChildCtrl(viewCtrl);
			}
			const childCount = viewInst.numChildren || 0;
			for (let i = 0; i < childCount; i++) {
				const child = viewInst.getChildAt(i) as IView;
				initView(child, viewCtrl);
			}
			viewInst.onCreate?.();
		}

		const constructFromResource = prototype[ "constructFromResource" ];
		prototype["constructFromResource"] = function() {
			constructFromResource.call(this);
			initView(this);
		}

		const oldDispose = prototype.dispose;
		prototype.dispose = function () {
			oldDispose.call(this);
			const _this = this as IView;
			_this.userData = null;
			_this.listener = null;
		}
	}

	private static BaseCtrlExtend() {
		let prototype = BaseViewCtrl.prototype as IViewCtrl;
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); }
		prototype.addMessage = function (type, callback, args?, once?) {
			const _this = this as IViewCtrl;
			if (once) _this.listener.once(type, _this, callback, args);
			else _this.listener.on(type, _this, callback, args);
		}
		prototype.sendMessage = function (type, data) { (<IViewCtrl>this).listener.event(type, data); }
		prototype.onForeground = function () { }
		prototype.onBackground = function () { }
		prototype.addView = function (viewId, data, callback, hideTop) {
			uiMgr.addView(viewId, data, callback, hideTop);
		}
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); }
		prototype.removeSelf = function () {
			const viewId = (<IViewCtrl>this).view.viewId;
			//只有UI界面才能移除自身
			viewId.startsWith("UI") && uiMgr.removeView(viewId);
		}
	}
}