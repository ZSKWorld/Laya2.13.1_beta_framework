import { eventMgr } from "../../libs/event/EventMgr";
import { userData } from "../../userData/UserData";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { IView, IViewCtrl } from "./Interfaces";
import { uiMgr } from "./UIManager";

/** 页面及控制器扩展 */
export class ViewExtend {
	static init() {
		this.fguiGComponentExtend();
		this.baseCtrlExtend();
	}

	private static fguiGComponentExtend() {
		let prototype = fgui.GComponent.prototype as IView;
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); }
		prototype.sendMessage = function (type, data) { (<IView>this).listener.event(type, data); }
		prototype.addMessage = function (type: string, callback: Function, args?: any[], once?: boolean) {
			const _this = this as IView;
			if (once) _this.listener.once(type, _this, callback, args);
			else _this.listener.on(type, _this, callback, args);
		}
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); }
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); }
		prototype.removeSelf = function () { uiMgr.removeView((<IView>this).viewId); }
		prototype.showOpenAni = function () {
			return Promise.resolve();
		}
		prototype.showCloseAni = function () {
			return Promise.resolve();
		}

		prototype.initView = function (viewInst) {
			viewInst = viewInst || this;
			let viewCtrl: IViewCtrl;
			viewCtrl = viewInst.addComponent(viewInst.CtrlClass);
			viewCtrl.userData = userData;
			if (viewInst !== this) {
				const that = (this as IView);
				const thisCtrl = that.getComponent(that.CtrlClass);
				thisCtrl?.addChildCtrl(viewCtrl);
			}
			viewInst.listener = viewCtrl.listener;
			viewInst.userData = userData;
			viewInst.onCreate?.();
			return viewCtrl;
		}
		const oldDispose = prototype.dispose;
		prototype.dispose = function () {
			oldDispose.call(this);
			const _this = this as IView;
			_this.userData = null;
			_this.listener = null;
		}
	}

	private static baseCtrlExtend() {
		let prototype = BaseViewCtrl.prototype as IViewCtrl;
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); }
		prototype.addMessage = function (type: string, callback: Function, args?: any[], once?: boolean) {
			const _this = this as IViewCtrl;
			if (once) _this.listener.once(type, _this, callback, args);
			else _this.listener.on(type, _this, callback, args);
		}
		prototype.sendMessage = function (type, data) { (<IViewCtrl>this).listener.event(type, data); }
		prototype.onForeground = function () { }
		prototype.onBackground = function () { }
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); }
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); }
		prototype.removeSelf = function () { uiMgr.removeView((<IViewCtrl>this).view.viewId); }
		prototype.showOpenAni = function () {
			return Promise.resolve();
		}
		prototype.showCloseAni = function () {
			return Promise.resolve();
		}
	}
}