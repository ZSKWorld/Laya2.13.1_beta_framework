import { Observer } from "../../libs/event/Observer";
import { Logger } from "../../libs/utils/Logger";
import { Layer, layerMgr } from "./GameLayer";
import { IProxy_Class, IViewCtrl, IViewCtrl_Class, IView_Class, ViewEvent } from "./Interfaces";
import { ViewID } from "./ViewID";

const logger = Logger.Create("UIManager", true);

/** 页面缓存管理 */
class UICache {

	/**不会销毁的页面缓存 */
	private _dontDestroyCache = new Map<ViewID, IViewCtrl>();

	/**
	 * 缓存页面
	 * @param viewInst {@link IViewCtrl} 页面实例
	 */
	addView(viewInst: IViewCtrl) {
		const viewId = viewInst.viewId;
		this._dontDestroyCache.set(viewId, viewInst);
	}

	/**
	 * 从缓存中获取页面
	 * @param viewId {@link ViewID} 页面ID
	 * @returns 
	 */
	getView(viewId: ViewID) {
		let viewCtrl: IViewCtrl;
		if (this._dontDestroyCache.has(viewId)) {
			viewCtrl = this._dontDestroyCache.get(viewId);
			this._dontDestroyCache.delete(viewId);
		}
		return viewCtrl;
	}

}

/** UI管理类 */
class UIManager extends Observer {
	private _viewClsMap: { [ key in ViewID ]?: IView_Class } = {};
	private _ctrlClsMap: { [ key in ViewID ]?: IViewCtrl_Class } = {};
	private _proxyClsMap: { [ key in ViewID ]?: IProxy_Class } = {};

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏面板 */
	private _lockPanel: fgui.GGraph;
	/** 已打开页面 */
	private _openedCtrls: IViewCtrl[] = [];


	/** 当前显示的顶层页面 */
	private get topCtrl() { return this._openedCtrls[ 0 ]; }

	init() {
		if (this._cache) return;
		this._cache = new UICache();

		this._lockPanel = new fgui.GGraph();
		this._lockPanel.name = "LockPanel";
		this._lockPanel.makeFullScreen();
		this._lockPanel.drawRect(0, "", "#00000000");
		layerMgr.addObject(this._lockPanel, Layer.Lock);

		//延迟250防止频繁触发
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.once(250, this, this.onResize));
	}

	registView(viewId: ViewID, viewCls: IView_Class, ctrlCls?: IViewCtrl_Class, proxyCls?: IProxy_Class) {
		if (!viewCls) throw new Error("参数不能为空！");
		if (!this._viewClsMap[ viewId ]) {
			viewCls.prototype.viewId = viewId;
			ctrlCls.prototype.viewId = viewId;
			this._viewClsMap[ viewId ] = viewCls;
			this._ctrlClsMap[ viewId ] = ctrlCls;
			this._proxyClsMap[ viewId ] = proxyCls;
		} else {
			logger.warn(`重复添加映射 => ${ viewId }`);
		}
	}

	getViewCtrl(viewId: ViewID) { return this._ctrlClsMap[ viewId ]; }

	getProxy(viewId: ViewID) { return this._proxyClsMap[ viewId ]; }

	/** 创建页面
	 * @param viewId {@link ViewID} 页面ID
	 * @param fullScreen 是否全屏
	 */
	createView(viewId: ViewID, fullScreen: boolean = true) {
		const viewInst = this._viewClsMap[ viewId ].createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		return viewInst.initView();
	}

	/** 添加页面
	 * @param viewId {@link ViewID} 页面ID
	 * @param data 页面数据
	 * @param callback {@link Laya.Handler} 回调
	 * @param hideTop 是否隐藏顶部页面
	 */
	addView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop: boolean = true) {
		let viewCtrl: IViewCtrl;
		this._lockPanel.visible = true;
		let openedIndex = this.getOpenViewIndex(viewId);
		if (openedIndex == -1) {
			//先尝试从缓存池中获取
			viewCtrl = this._cache.getView(viewId);
			if (viewCtrl) this.addView2(viewCtrl, data, hideTop, callback);
			else {
				fgui.UIPackage.loadPackage([ this._viewClsMap[ viewId ].PkgRes ], Laya.Handler.create(this, (res: any[]) => {
					if (!res || !res.length) {
						if (confirm(`界面 ${ viewId } 加载失败，是否重试?`))
							this.addView(viewId, data, callback, hideTop);
						else
							this.addView2(viewCtrl, data, hideTop, callback);
					} else {
						viewCtrl = this.createView(viewId);
						this.addView2(viewCtrl, data, hideTop, callback);
					}
				}));
			}
		} else {
			if (openedIndex == 0) logger.warn(`Error:${ viewId }已经被打开`);
			viewCtrl = this._openedCtrls.splice(openedIndex, 1)[ 0 ];
			this.addView2(viewCtrl, data, hideTop, callback);
		}
	}

	/** 移除顶层页面 */
	removeTopView() { this.topCtrl && this.removeView(this.topCtrl.viewId); }

	/** 移除页面
	 * @param viewId {@link ViewID} 页面ID，为null则移除全部页面
	 */
	removeView(viewId: ViewID) {
		const { _openedCtrls } = this;
		if (!_openedCtrls.length) return;
		for (let i = _openedCtrls.length - 1; i >= 0; i--) {
			const viewInst = _openedCtrls[ i ];
			if (viewId == null || viewInst.viewId == viewId) {
				_openedCtrls.splice(i, 1);
				viewInst.view.removeFromParent();
				this._cache.addView(viewInst);
				break;
			}
		}
		this.addView2(this.topCtrl, this.topCtrl?.data, false, null);
	}

	/** 移除所有页面 */
	removeAllView() { this.removeView(null); }

	private onResize() {
		this._lockPanel.makeFullScreen();
		this._openedCtrls.forEach(v => v.view.makeFullScreen());
	}

	/** 获取已打开的页面索引 */
	private getOpenViewIndex(viewId: ViewID) {
		const { _openedCtrls } = this;
		for (let i = 0, n = _openedCtrls.length; i < n; i++) {
			const view = _openedCtrls[ i ];
			if (view.viewId == viewId) return i;
		}
		return -1;
	}

	private addView2(viewCtrl: IViewCtrl, data: any, hideTop: boolean, callback: Laya.Handler) {
		if (viewCtrl) {
			viewCtrl.data = data;
			const topCtrl = this.topCtrl;
			if (viewCtrl != topCtrl) {
				this._openedCtrls.unshift(viewCtrl);
				hideTop && topCtrl?.view.removeFromParent();
				topCtrl?.sendMessage(ViewEvent.OnBackground);
			}
			if (!viewCtrl.view.parent) {
				layerMgr.addObject(viewCtrl.view, viewCtrl.view.layer || Layer.Bottom);
				viewCtrl.sendMessage(ViewEvent.OnForeground);
			}
		}
		callback?.run();
		this._lockPanel.visible = false;
	}
}

export const uiMgr = new UIManager();
windowImmit("uiMgr", uiMgr)
