import { BaseViewCtrl } from "./BaseViewCtrl";

/** 页面及控制器扩展 */
export class ViewExtend {
	static extends() {
		this.viewExtend(BaseViewCtrl.prototype);
		this.viewExtend(fgui.GComponent.prototype as IView);
		this.fguiGComponentExtend();
	}

	private static fguiGComponentExtend() {
		const prototype = fgui.GComponent.prototype as IView;
		prototype.sendMessage = function (...args) {
			const viewCtrl = (<IView>this).viewCtrl;
			viewCtrl && viewCtrl.sendMessage(...args);
		}
		prototype.addMessage = function (type, callback, args?, once?) {
			const viewCtrl = (<IView>this).viewCtrl;
			viewCtrl && viewCtrl.addMessage(type, callback, args, once);
		}
		prototype.removeMessage = function (type, listener, onceOnly?) {
			const viewCtrl = (<IView>this).viewCtrl;
			viewCtrl && viewCtrl.removeMessage(type, listener, onceOnly);
		}

		const constructFromResource = prototype.constructFromResource;
		prototype.constructFromResource = function () {
			constructFromResource.call(this);
			const viewInst = <IView>this;
			let viewCtrl: IViewCtrl;
			if (viewInst.viewId) {
				const CtrlCls = uiMgr.getCtrlClass(viewInst.viewId);
				viewCtrl = viewInst.getComponent(CtrlCls);
				if (!viewCtrl && CtrlCls) {
					viewCtrl = viewInst.addComponent(CtrlCls);
				}
				viewInst.viewCtrl = viewCtrl;
			}
			viewInst.onCreate?.();
		}

		const oldDispose = prototype.dispose;
		prototype.dispose = function () {
			oldDispose.call(this);
			const _this = this as IView;
			_this.viewCtrl = null;
		}
		prototype.getPath = function () {
			let obj = this;
			let path = obj.name;
			while (obj.parent) {
				obj = obj.parent;
				path = (obj.name ? obj.name + "." : "") + path;
			}
			return path;
		}
	}

	private static viewExtend(prototype: IViewExtend) {
		prototype.dispatch = function (...args) { eventMgr.event(...args); }
		prototype.createView = function (...args) { return uiMgr.createView(...args); }
		prototype.showView = function (...args) { uiMgr.showView(...args); }
		prototype.removeTopView = function () { uiMgr.removeTopView(); }
		prototype.removeAllView = function () { uiMgr.removeAllView(); }
		prototype.removeView = function (...args) { uiMgr.removeView(...args); }
		prototype.removeSelf = function () {
			const viewId = (<IViewExtend>this).viewId;
			//只有UI界面才能移除自身
			viewId.startsWith("UI") && uiMgr.removeView(viewId);
		}
	}
}