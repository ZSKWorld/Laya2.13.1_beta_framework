/**
 * @Author       : zsk
 * @Date         : 2022-04-18 22:11:15
 * @LastEditors  : zsk
 * @LastEditTime : 2022-07-24 19:22:31
 * @Description  : UI管理类
 */
import { NotifyConst } from "../../common/NotifyConst";
import { platform } from "../../common/platform/Platform";
import { InsertNotify } from "../../libs/event/EventMgr";
import { Observer } from "../../libs/event/Observer";
import { Layer, layerMgr } from "./GameLayer";
import { IView } from "./interfaces";
import { ViewClass } from "./UIGlobal";
import { ViewID } from "./ViewID";

class UIManager extends Observer {
	/**销毁缓存时间，毫秒 */
	private static readonly DestroyCacheTime = 60000;

	/** 已打开页面 */
	private _openedViews: IView[] = [];

	/** 锁屏面板 */
	private _lockPanel: fgui.GGraph;

	/** 加载锁屏面板 */
	private _loadingPanel: fgui.GObject;

	/**销毁缓存，销毁前保留一段时间，期间不在使用就销毁 */
	private _destroyCache: Map<ViewID, [ IView, number ]> = new Map();

	/** 当前显示的顶层页面 */
	private get topView() { return this._openedViews[0]; }

	init() {

		this._lockPanel = new fgui.GGraph();
		this._lockPanel.makeFullScreen();
		this._lockPanel.drawRect(0, "", "#00000000");
		this._lockPanel.visible = false;
		layerMgr.addObject(this._lockPanel, Layer.Lock);

		this._loadingPanel = fgui.UIPackage.createObject("PkgCommon", "UILoading");
		this._loadingPanel.makeFullScreen();

		//延迟250是为了防抖
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.once(250, this, this.onResize));
		Laya.timer.loop(10000, this, this.checkDestroyCache);
	}

	/**
	 * @description 创建页面实例
	 * @param viewId 页面ID
	 * @param fullScreen 是否全屏
	 * @param init 是否初始化页面
	 * @param data 页面数据
	 * @return 页面实例
	 */
	createViewInstance<T = any>(viewId: ViewID, fullScreen: boolean = true, init?: boolean, data?: T): IView {
		const viewInst = ViewClass[viewId].createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		init && viewInst.initView(viewId, viewInst, null, data);
		return viewInst;
	}

	/**
	 * @description 添加页面
	 * @param viewId 页面ID
	 * @param data 页面数据
	 * @param callback 回调
	 * @param hideTop 是否隐藏顶部页面
	 */
	@InsertNotify(NotifyConst.AddView)
	addView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop: boolean = true) {
		this._lockPanel.visible = true;
		let openedIndex = this.getOpenViewIndex(viewId);
		if ( openedIndex == -1 ) {
			//先尝试从待销毁缓存池中获取
			if ( this._destroyCache.has(viewId) ) {
				const viewInst = this._destroyCache.get(viewId)[0];
				this._destroyCache.delete(viewId);
				this.addView2(viewId, viewInst, data, hideTop, this.topView, callback);
			} else {
				layerMgr.addObject(this._loadingPanel, Layer.Lock);
				fgui.UIPackage.loadPackage([ ViewClass[viewId].PkgRes ], Laya.Handler.create(this, (res: any[]) => {
					if ( !res || !res.length ) {
						platform.confirm(`界面 ${ viewId } 加载失败，是否重试?`,
							"", false, () => this.addView(viewId, data, callback, hideTop));
					} else {
						const viewInst = this.createViewInstance(viewId);
						this.addView2(viewId, viewInst, data, hideTop, this.topView, callback);
					}
				}));
			}
		} else {
			let oldTopView: IView, newTopView: IView;
			if ( openedIndex == 0 ) console.error(`Error:${ viewId }已经被被打开`);
			else {
				[ oldTopView, newTopView ] = [ this.topView, this._openedViews[openedIndex] ];
				this._openedViews.splice(openedIndex, 1);
			}
			this.addView2(viewId, newTopView, data, hideTop, oldTopView, callback);
		}
	}

	/**
	 * @description 关闭顶层页面
	 */
	removeTop() {
		let topView = this.topView;
		if ( topView ) {
			this.removeView(topView.name as ViewID);
			topView = this.topView;
			topView && layerMgr.addObject(topView, topView.layer || Layer.BottomUI);
		}
	}

	/**
	 * @description 关闭所有页面
	 */
	removeAllView() {
		this._openedViews.forEach(view => {
			view.removeFromParent();
			this._destroyCache.set(view.name as ViewID, [ view, Date.now() ]);
		});
		this._openedViews.length = 0;
	}

	/**
	 * @description 关闭页面
	 * @param viewId 页面ID
	 */
	removeView(viewId: ViewID) {
		const { _openedViews } = this;
		for ( let i = 0, n = _openedViews.length; i < n; i++ ) {
			const view = _openedViews[i];
			if ( view.name == viewId ) {
				view.removeFromParent();
				this._destroyCache.set(viewId, [ view, Date.now() ]);
				_openedViews.splice(i, 1);
				break;
			}
		}
	}

	private onResize() {
		const { _openedViews: views, _lockPanel, _loadingPanel } = this;
		_lockPanel.makeFullScreen();
		_loadingPanel.makeFullScreen();
		for ( let i = views.length - 1; i >= 0; i-- ) {
			views[i] && views[i].makeFullScreen();
		}
	}

	/**
	 * @description 获取一打开的页面索引
	 * @param viewId 页面ID
	 * @return 页面索引
	 */
	private getOpenViewIndex(viewId: ViewID) {
		const { _openedViews: openedViews } = this;
		for ( let i = 0, n = openedViews.length; i < n; i++ ) {
			const view = openedViews[i];
			if ( view.name == viewId ) return i;
		}
		return -1;
	}

	private checkDestroyCache() {
		if ( this._destroyCache.size > 0 ) {
			for ( const iterator of this._destroyCache ) {
				const [ viewID, [ view, startTime ] ] = iterator;
				if ( (Date.now() - startTime) >= UIManager.DestroyCacheTime ) {
					view.dispose();
					this._destroyCache.delete(viewID);
				}
			}
		}
	}

	private addView2(viewID: ViewID, viewInst: IView, data: any, hideTop: boolean, topView: IView, callback: Laya.Handler) {
		if ( viewInst ) {
			hideTop && topView && topView.removeFromParent();
			this._openedViews.unshift(viewInst);
			viewInst.initView(viewID, viewInst, null, data);
			layerMgr.addObject(viewInst, viewInst.layer || Layer.BottomUI);
			callback && callback.run();
		}
		this._lockPanel.visible = false;
		this._loadingPanel.removeFromParent();
	}
}

export const uiMgr = new UIManager();
window["uiMgr"] = uiMgr;
