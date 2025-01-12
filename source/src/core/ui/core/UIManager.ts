import { Observer } from "../../game/event/Observer";
import { layerMgr } from "./LayerManager";

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
		const viewCtrl = this._views.get(viewId);
		this._views.delete(viewId);
		return viewCtrl;
	}

	destroyView(viewId: ViewID) {
		const viewCtrl = this.getView(viewId);
		viewCtrl && viewCtrl.view.dispose();
	}

	onResize() {
		this._views.forEach(v => v.view.makeFullScreen());
	}

}

/** UI管理类 */
export class UIManager extends Observer implements IUIManager {
	/** 页面类映射 */
	private _viewClsMap: { [key: string]: IViewClass } = {};
	/** 页面控制器类映射 */
	private _ctrlClsMap: { [key: string]: IViewCtrlClass } = {};
	/** 页面控制器网络代理类映射 */
	private _proxyClsMap: { [key: string]: IViewProxyClass } = {};

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏计数标识 */
	private _lockMark: number = 0;
	/** 锁屏面板 */
	private _lockPanel: fgui.GGraph;
	/** 已打开页面 */
	private _openedCtrls: IViewCtrl[] = [];

	/** 当前显示的顶层页面 */
	private get topCtrl() { return this._openedCtrls[0]; }
	private get lockMark() { return this._lockMark; }
	private set lockMark(value: number) {
		this._lockMark = value;
		this._lockPanel.visible = value != 0;
	}

	init() {
		this._cache = new UICache();

		this._lockPanel = new fgui.GGraph();
		this._lockPanel.name = "LockPanel";
		this._lockPanel.makeFullScreen();
		this._lockPanel.drawRect(0, "", "#00000000");
		this._lockPanel.sortingOrder = 999;
		layerMgr.addObject(this._lockPanel, Layer.UITop);

		//延迟100防止频繁触发
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.callLater(this, this.onResize));
	}

	registView(viewId: ViewID, viewCls: IViewClass, ctrlCls?: IViewCtrlClass, proxyCls?: IViewProxyClass) {
		if (!viewCls) throw new Error("参数不能为空！");
		viewCls && (viewCls.prototype.viewId = viewId);
		ctrlCls && (ctrlCls.prototype.viewId = viewId);
		ctrlCls && (ctrlCls.prototype.ProxyClass = proxyCls);
		proxyCls && (proxyCls.prototype.viewId = viewId);
		this._viewClsMap[viewId] = viewCls;
		this._ctrlClsMap[viewId] = ctrlCls;
		this._proxyClsMap[viewId] = proxyCls;
	}
	getViewClass(viewId: ViewID) { return this._viewClsMap[viewId]; }
	getCtrlClass(viewId: ViewID) { return this._ctrlClsMap[viewId]; }
	getProxyClass(viewId: ViewID) { return this._proxyClsMap[viewId]; }

	isTopView(view: IViewCtrl | IView) {
		if (!view) return false;
		if (!this._openedCtrls[0]) return false;
		return this._openedCtrls[0] == view || this._openedCtrls[0].view == view;
	}

	createView(viewId: ViewID, fullScreen: boolean = false) {
		const viewInst = this.getViewClass(viewId).createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		return viewInst.getComponent(this.getCtrlClass(viewId));
	}

	showView<T = any>(viewId: ViewID, data?: T) {
		this.lockMark++;
		let openedIndex = this._openedCtrls.findIndex(v => v.viewId == viewId);
		if (openedIndex == -1) {
			const viewCtrl = this._cache.getView(viewId);
			if (viewCtrl) return this.showView2(viewCtrl, data);
			else {
				return loadMgr.loadPackage(this.getViewClass(viewId).pkgRes).then(
					() => this.showView2(this.createView(viewId, true), data),
					() => { ShowConfirm("提示", `界面 ${ viewId } 加载失败，是否重试?`) },
				);
			}
		} else {
			return this.showView2(this._openedCtrls[openedIndex], data);
		}
	}

	removeTopView() { this.topCtrl && this.removeView(this.topCtrl.viewId); }

	removeView(viewId: ViewID) {
		const index = this._openedCtrls.findIndex(v => v.viewId == viewId);
		if (index <= -1) return;
		const hideView = this._openedCtrls[index];
		if (!hideView.view.parent) {
			this._openedCtrls.splice(index, 1);
			this._cache.cacheView(hideView);
			return;
		}
		this.lockMark++;
		this._openedCtrls.splice(index, 1);
		hideView.onCloseAni().then(() => {
			hideView.view.removeFromParent();
			this._cache.cacheView(hideView);
			this.showView2(this.topCtrl, this.topCtrl?.data);
		});
	}

	removeAllView() {
		this._openedCtrls.forEach(v => {
			v.view.parent && v.view.removeFromParent();
			this._cache.cacheView(v);
		});
		this._openedCtrls.length = 0;
	}

	destroyView(viewId: ViewID) {
		this._cache.destroyView(viewId);
		const index = this._openedCtrls.findIndex(v => v.viewId == viewId);
		if (index >= 0) {
			const viewCtrl = this._openedCtrls[index];
			this._openedCtrls.splice(index, 1);
			viewCtrl.view.dispose();
		}
	}

	private showView2(viewCtrl: IViewCtrl, data: any) {
		const onFinally = () => {
			this.lockMark--;
			return Promise.resolve();
		};
		if (viewCtrl) {
			viewCtrl.data = data || viewCtrl.data;
			const openIndex = this._openedCtrls.findIndex(v => v == viewCtrl);
			const doOpenAni = openIndex != 0;
			openIndex > 0 && this._openedCtrls.splice(openIndex, 1);
			doOpenAni && this._openedCtrls.unshift(viewCtrl);
			doOpenAni && layerMgr.addObject(viewCtrl.view, viewCtrl.view.layer || Layer.UIBottom);
			return doOpenAni ? viewCtrl.onOpenAni().finally(onFinally) : onFinally();
		} else return onFinally();
	}

	private onResize() {
		this._lockPanel.makeFullScreen();
		this._openedCtrls.forEach(v => v.view.makeFullScreen());
		this._cache.onResize();
	}
}
WindowImmit("uiMgr", new UIManager());