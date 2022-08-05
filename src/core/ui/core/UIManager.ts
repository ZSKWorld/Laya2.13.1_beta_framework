/**
 * @Author       : zsk
 * @Date         : 2022-04-18 22:11:15
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-06 01:45:37
 * @Description  : UI管理类
 */
import { NotifyConst } from "../../common/NotifyConst";
import { platform } from "../../common/platform/Platform";
import { InsertNotify } from "../../libs/event/EventMgr";
import { Observer } from "../../libs/event/Observer";
import { Logger } from "../../libs/utils/Logger";
import { Layer, layerMgr } from "./GameLayer";
import { IView } from "./interfaces";
import { ViewClass } from "./UIGlobal";
import { ViewID } from "./ViewID";

const logger = Logger.Create("UIManager").setEnable(true);

class UIManager extends Observer {
	/**销毁缓存时间，毫秒 */
	private static readonly DestroyCacheTime = 60000;

	/** 已打开页面 */
	private openedViews: IView[] = [];

	/** 锁屏面板 */
	private lockPanel: fgui.GGraph;

	/**销毁缓存，销毁前保留一段时间，期间不在使用就销毁 */
	private destroyCache: Map<ViewID, [ IView, number ]> = new Map();

	/** 当前显示的顶层页面 */
	private get topView() { return this.openedViews[ 0 ]; }

	private onResize() {
		const { openedViews: views, lockPanel } = this;
		lockPanel.makeFullScreen();
		for (let i = views.length - 1; i >= 0; i--) {
			views[ i ] && views[ i ].makeFullScreen();
		}
	}

	private checkDestroyCache() {
		if (this.destroyCache.size > 0) {
			for (const iterator of this.destroyCache) {
				const [ viewID, [ view, startTime ] ] = iterator;
				if ((Date.now() - startTime) >= UIManager.DestroyCacheTime) {
					logger.warn("dispose view", view.name);
					view.dispose();
					this.destroyCache.delete(viewID);
				}
			}
		}
	}

	init() {
		this.lockPanel = new fgui.GGraph();
		this.lockPanel.makeFullScreen();
		this.lockPanel.drawRect(0, "", "#00000000");
		layerMgr.addObject(this.lockPanel, Layer.Lock);

		//延迟250是为了防抖
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.once(250, this, this.onResize));
		Laya.timer.loop(10000, this, this.checkDestroyCache);
	}

	/** 获取一打开的页面索引
	 * @param viewId 页面ID
	 * @return 页面索引
	 */
	private getOpenViewIndex(viewId: ViewID) {
		const { openedViews: openedViews } = this;
		for (let i = 0, n = openedViews.length; i < n; i++) {
			const view = openedViews[ i ];
			if (view.name == viewId) return i;
		}
		return -1;
	}

	/** 创建页面实例
	 * @param viewId 页面ID
	 * @param fullScreen 是否全屏
	 * @param init 是否初始化页面
	 * @param data 页面数据
	 * @return 页面实例
	 */
	createViewInstance<T = any>(viewId: ViewID, fullScreen: boolean = true, init?: boolean, data?: T): IView {
		const viewInst = ViewClass[ viewId ].createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		init && viewInst.initView(viewId, viewInst, null, data);
		return viewInst;
	}

	/** 添加页面
	 * @param viewId 页面ID
	 * @param data 页面数据
	 * @param callback 回调
	 * @param hideTop 是否隐藏顶部页面
	 */
	@InsertNotify(NotifyConst.AddView)
	addView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop: boolean = true) {
		this.lockPanel.visible = true;
		let openedIndex = this.getOpenViewIndex(viewId);
		if (openedIndex == -1) {
			//先尝试从待销毁缓存池中获取
			if (this.destroyCache.has(viewId)) {
				const viewInst = this.destroyCache.get(viewId)[ 0 ];
				this.destroyCache.delete(viewId);
				this.addView2(viewId, viewInst, data, hideTop, this.topView, callback);
			} else {
				fgui.UIPackage.loadPackage([ ViewClass[ viewId ].PkgRes ], Laya.Handler.create(this, (res: any[]) => {
					if (!res || !res.length) {
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
			if (openedIndex == 0) logger.error(`Error:${ viewId }已经被被打开`);
			else {
				[ oldTopView, newTopView ] = [ this.topView, this.openedViews[ openedIndex ] ];
				this.openedViews.splice(openedIndex, 1);
			}
			this.addView2(viewId, newTopView, data, hideTop, oldTopView, callback);
		}
	}

	private addView2(viewID: ViewID, viewInst: IView, data: any, hideTop: boolean, topView: IView, callback: Laya.Handler) {
		if (viewInst) {
			hideTop && topView && topView.removeFromParent();
			this.openedViews.unshift(viewInst);
			viewInst.initView(viewID, viewInst, null, data);
			layerMgr.addObject(viewInst, viewInst.layer || Layer.Bottom);
			callback && callback.run();
		}
		this.lockPanel.visible = false;
	}

	/** 关闭顶层页面 */
	removeTop() {
		let topView = this.topView;
		if (topView) {
			this.removeView(topView.name as ViewID);
			topView = this.topView;
			topView && layerMgr.addObject(topView, topView.layer || Layer.Bottom);
		}
	}

	/** 关闭页面
	 * @param viewId 页面ID
	 */
	removeView(viewId: ViewID) {
		const { openedViews: _openedViews } = this;
		for (let i = 0, n = _openedViews.length; i < n; i++) {
			const view = _openedViews[ i ];
			if (view.name == viewId) {
				view.removeFromParent();
				this.destroyCache.set(viewId, [ view, Date.now() ]);
				_openedViews.splice(i, 1);
				break;
			}
		}
	}

	/** 关闭所有页面 */
	removeAllView() {
		this.openedViews.forEach(view => {
			view.removeFromParent();
			this.destroyCache.set(view.name as ViewID, [ view, Date.now() ]);
		});
		this.openedViews.length = 0;
	}
}

export const uiMgr = new UIManager();
window[ "uiMgr" ] = uiMgr;
