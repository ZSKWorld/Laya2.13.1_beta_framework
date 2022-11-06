import { eventMgr } from "../../libs/event/EventMgr";
import { userData } from "../../userData/UserData";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { IView, IViewCtrl } from "./Interfaces";
import { CtrlClass } from "./UIGlobal";
import { uiMgr } from "./UIManager";

/** 页面及控制器扩展 */
export class ViewExtend {
	static init() {
		this.fguiGComponentExtend();
		this.baseCtrlExtend();
	}

	private static fguiGComponentExtend() {
		let prototype = fgui.GComponent.prototype as IView;
		prototype.sendMessage = function (type, data) { (<IView>this).listener?.event(type, data); };
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); };
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); };
		prototype.removeTopView = function () { uiMgr.removeTopView(); };
		prototype.removeAllView = function () { uiMgr.removeAllView(); };
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); };
		prototype.removeSelf = function () { uiMgr.removeView((<IView>this).viewId); };
		prototype.initView = function (viewInst, listener, data) {
			//是否是新挂载组件，只有新挂载的组件才执行onCreate方法
			let newComp = true;
			let viewCtrl: IViewCtrl;
			const CtrlCls = CtrlClass[ viewInst.viewId ];
			if (CtrlCls) {
				viewCtrl = viewInst.getComponent(CtrlCls);
				if (viewCtrl) newComp = false;
				else viewCtrl = viewInst.addComponent(CtrlCls);
				data != null && (viewCtrl.data = data);
				viewCtrl.listener = listener;
				viewCtrl.userData = userData;
				if (viewInst !== this) {
					const that = (this as IView);
					const ThisCtrlCls = CtrlClass[ that.viewId ];
					const thisCtrl = that.getComponent(ThisCtrlCls);
					thisCtrl?.subCtrls.push(viewCtrl);
				}
			}
			viewInst.userData = userData;
			//这里不能使用传入的listener，传入的可能为空值
			viewInst.listener = viewCtrl?.listener;
			newComp && viewInst.onCreate?.();
		};
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
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); };
		prototype.removeTopView = function () { uiMgr.removeTopView(); };
		prototype.removeAllView = function () { uiMgr.removeAllView(); };
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); };
		prototype.removeSelf = function () { uiMgr.removeView((<IViewCtrl>this).view.viewId); };
	}
}