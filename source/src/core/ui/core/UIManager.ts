import { platformMgr } from "../../../platform/PlatformManager";
import { ResPath } from "../../common/ResPath";
import { Observer } from "../../libs/event/Observer";
import { UIConfirmData } from "../view/PkgCommon/controller/UIConfirmCtrl";
import { Layer, layerMgr } from "./LayerManager";
import { ViewEvent } from "./UIDefine";
import { ViewID } from "./ViewID";

/** 页面缓存 */
class UICache {

	/**不会销毁的页面缓存 */
	private _views = new Map<string, IViewCtrl>();

	/**
	 * 缓存页面
	 * @param viewCtrl {@link IViewCtrl} 页面实例
	 */
	cacheView(viewCtrl: IViewCtrl) {
		const viewId = viewCtrl.viewId;
		this._views.set(viewId, viewCtrl);
	}

	/**
	 * 从缓存中获取页面
	 * @param viewId 页面id
	 * @returns
	 */
	getView(viewId: ViewID) {
		let viewCtrl: IViewCtrl;
		if (this._views.has(viewId)) {
			viewCtrl = this._views.get(viewId);
			this._views.delete(viewId);
		}
		return viewCtrl;
	}

	onResize() {
		this._views.forEach(v => v.view.makeFullScreen());
	}

}

/** UI管理类 */
class UIManager extends Observer {
	/** 页面类映射 */
	private _viewClsMap: { [ key: string ]: Class<IView> & { createInstance?(): IView, readonly PkgRes?: string } } = {};
	/** 页面控制器类映射 */
	private _ctrlClsMap: { [ key: string ]: Class<IViewCtrl> } = {};
	/** 页面控制器网络代理类映射 */
	private _proxyClsMap: { [ key: string ]: Class<IViewProxy> } = {};

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏面板 */
	private _lockPanel: fgui.GGraph;
	/** 已打开页面 */
	private _openedCtrls: IViewCtrl[] = [];

	/** 当前显示的顶层页面 */
	private get topCtrl() { return this._openedCtrls[ 0 ]; }

	init() {
		this._cache = new UICache();

		this._lockPanel = new fgui.GGraph();
		this._lockPanel.name = "LockPanel";
		this._lockPanel.makeFullScreen();
		this._lockPanel.drawRect(0, "", "#00000000");
		this._lockPanel.sortingOrder = 999;
		layerMgr.addObject(this._lockPanel, Layer.Bottom);

		//延迟100防止频繁触发
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.once(100, this, this.onResize));
	}

	registView(viewId: ViewID, viewCls: Class<IView>, ctrlCls?: Class<IViewCtrl>, proxyCls?: Class<IViewProxy>) {
		if (!viewCls) throw new Error("参数不能为空！");
		if (!this._viewClsMap[ viewId ]) {
			viewCls && (viewCls.prototype.viewId = viewId);
			ctrlCls && (ctrlCls.prototype.viewId = viewId);
			ctrlCls && (ctrlCls.prototype.ProxyClass = proxyCls);
			proxyCls && (proxyCls.prototype.viewId = viewId);
			this._viewClsMap[ viewId ] = viewCls;
			this._ctrlClsMap[ viewId ] = ctrlCls;
			this._proxyClsMap[ viewId ] = proxyCls;
		}
	}

	getViewClass(viewId: ViewID) { return this._viewClsMap[ viewId ]; }

	getCtrlClass(viewId: ViewID) { return this._ctrlClsMap[ viewId ]; }

	getProxyClass(viewId: ViewID) { return this._proxyClsMap[ viewId ]; }

	/** 创建页面
	 * @param viewId 页面id
	 * @param fullScreen 是否全屏
	 */
	createView(viewId: ViewID, fullScreen: boolean = false): IViewCtrl {
		const viewInst = this._viewClsMap[ viewId ].createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		return viewInst.getComponent(this.getCtrlClass(viewId));
	}

	showConfirm(title: string, msg: string): Promise<boolean> {
		const commonPkg = fgui.UIPackage.getById(ResPath.PkgPath.PkgCommon);
		if (!commonPkg) return platformMgr.showConfirm(title, msg);
		return new Promise(resolve => {
			this.showView<UIConfirmData>(
				ViewID.UIConfirmView,
				{
					title,
					content: msg,
					onCancel: Laya.Handler.create(null, resolve, [ false ]),
					onConfirm: Laya.Handler.create(null, resolve, [ true ]),
				});
		});
	}

	/** 添加页面
	 * @param viewId 页面id
	 * @param data 页面数据
	 * @param callback {@link Laya.Handler} 回调
	 */
	showView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler) {
		let viewCtrl: IViewCtrl;
		this._lockPanel.visible = true;
		let openedIndex = this._openedCtrls.findIndex(v => v.viewId == viewId);
		if (openedIndex == -1) {
			//先尝试从缓存池中获取
			viewCtrl = this._cache.getView(viewId);
			if (viewCtrl) this.showView2(viewCtrl, data, callback);
			else {
				fgui.UIPackage.loadPackage([ this._viewClsMap[ viewId ].PkgRes ], Laya.Handler.create(this, (res: any[]) => {
					if (!res || !res.length) {
						this.showConfirm("提示", `界面 ${ viewId } 加载失败，是否重试?`).then(result => {
							if (result) this.showView(viewId, data, callback);
							else this.showView2(viewCtrl, data, callback);
						});
					} else {
						viewCtrl = this.createView(viewId, true);
						this.showView2(viewCtrl, data, callback);
					}
				}));
			}
		} else {
			if (openedIndex == 0) {
				callback && callback.run();
				this._lockPanel.visible = false;
			}
			else {
				viewCtrl = this._openedCtrls[ openedIndex ];
				this.showView2(viewCtrl, data, callback);
			}
		}
	}

	/** 移除顶层页面 */
	removeTopView() { this.topCtrl && this.removeView(this.topCtrl.viewId); }

	/** 移除页面
	 * @param viewId 页面id
	 */
	removeView(viewId: ViewID) {
		const hideView = this._openedCtrls.find(v => v.viewId == viewId);
		if (!hideView) return;
		if (!hideView.view.parent) {
			this._openedCtrls.remove(hideView);
			this._cache.cacheView(hideView);
			return;
		}
		this._lockPanel.visible = true;
		hideView.onCloseAni().then(() => {
			this._openedCtrls.remove(hideView);
			hideView.view.removeFromParent();
			hideView.sendMessage(ViewEvent.OnBackground);
			this._cache.cacheView(hideView);
			this.showView2(this.topCtrl, this.topCtrl?.data);
		});
	}

	/** 移除所有页面 */
	removeAllView() {
		this._openedCtrls.forEach(v => {
			if (v.view.parent) {
				v.view.removeFromParent();
				v.sendMessage(ViewEvent.OnBackground);
			}
			this._cache.cacheView(v);
		});
		this._openedCtrls.length = 0;
	}

	private onResize() {
		this._lockPanel.makeFullScreen();
		this._openedCtrls.forEach(v => v.view.makeFullScreen());
		this._cache.onResize();
	}

	private showView2(viewCtrl: IViewCtrl, data: any, callback?: Laya.Handler) {
		const onFinally = () => {
			callback && callback.run();
			this._lockPanel.visible = false;
		};
		if (viewCtrl) {
			viewCtrl.data = data;
			const openIndex = this._openedCtrls.findIndex(v => v == viewCtrl);
			const doOpenAni = openIndex != 0;
			openIndex > 0 && this._openedCtrls.splice(openIndex, 1);
			doOpenAni && this._openedCtrls.unshift(viewCtrl);
			layerMgr.addObject(viewCtrl.view, viewCtrl.view.layer || Layer.Bottom);
			viewCtrl.sendMessage(ViewEvent.OnForeground);
			doOpenAni ? viewCtrl.onOpenAni().finally(onFinally) : onFinally();
		} else onFinally();
	}
}
export const uiMgr = new UIManager();
windowImmit("uiMgr", uiMgr);
