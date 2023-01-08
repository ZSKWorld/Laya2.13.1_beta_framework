import { Observer } from "../core/libs/event/Observer";
import { loadMgr } from "../core/libs/load/LoadMgr";
import { Logger } from "../core/libs/utils/Logger";
import { uiMgr } from "../core/ui/core/UIManager";
import { ViewID } from "../core/ui/core/ViewID";
import { IScene } from "./ILogicScene";

const logger = Logger.Create("LogicSceneBase", true);

const enum ResGroupType {
	Normal,
	Const,
	All,
}

type LoadViewData = { updateHandler?: Laya.Handler };

/** 逻辑场景基类 */
export abstract class LogicSceneBase extends Observer implements IScene {
	views = new Set<ViewID>();
	/** 场景参数 */
	protected data: any;
	/** 加载时显示的load页面id */
	protected loadViewId: ViewID;
	/** load页面数据 */
	private _loadViewData: LoadViewData = {};
	/**
	 * 0.非ui资源加载进度
	 * 1.ui资源加载进度
	 * 2.缓冲时间进度
	 */
	private _progresses = [ 0, 0, 0 ];
	/** 非ui资源加载进度更新回调 */
	private _loadHandler1 = Laya.Handler.create(this, this.onLoadProgress, [ 0 ], false);
	/** ui资源加载进度更新回调 */
	private _loadHandler2 = Laya.Handler.create(this, this.onLoadProgress, [ 1 ], false);
	/** 缓冲时间进度更新回调 */
	private _loadHandler3 = Laya.Handler.create(this, this.updateProgressLater, null, false);

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	load() {
		const [ notUIRes, uiRes ] = this.getResGroup(ResGroupType.All);
		this._progresses[ 0 ] = notUIRes.length ? 0 : 1;
		this._progresses[ 1 ] = uiRes.length ? 0 : 1;
		this._progresses[ 2 ] = this.loadViewId ? 0 : 1;
		if (this.loadViewId) uiMgr.addView(this.loadViewId, this._loadViewData, null, false);
		this.updateProgressLater();
		return Promise.all([
			//加个最短时间，避免load页太快消失
			this.loadViewId ? new Promise(resolve => Laya.Tween.to(this._progresses, { 2: 1 }, 1000, null, Laya.Handler.create(null, resolve), 0, true).update = this._loadHandler3) : null,
			loadMgr.create(notUIRes, null, this._loadHandler1),
			loadMgr.loadPackage(uiRes, null, this._loadHandler2),
		]).then(
			() => {
				this._loadViewData.updateHandler = null;
				uiMgr.removeAllView();
			},
			() => {
				return Promise.reject<void>();
			}
		);
	}

	enter(data: any): void {
		this.data = data;
		this.onEnter();
	}

	exit(): void {
		this.onExit();
		if (this.loadViewId) {
			this._loadViewData.updateHandler = null;
			uiMgr.removeView(this.loadViewId);
		}
		//卸载资源
		const [ notUIRes, uiRes ] = this.getResGroup(ResGroupType.Normal);
		notUIRes.forEach(v => Laya.loader.clearRes(v));
		uiRes.forEach(v => {
			const res = fgui.UIPackage.getById(v);
			res?.unloadAssets();
		});

	}

	/** 可卸载资源，场景退出时卸载 */
	protected getResArray(): string[] { return []; };

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray(): string[] { return []; };

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;

	private onLoadProgress(index: number, progress: number) {
		this._progresses[ index ] = progress;
		this.updateProgressLater();
	}

	private updateProgressLater() {
		Laya.timer.callLater(this, this.updateLoadProgress);
	}

	private updateLoadProgress() {
		if (this._loadViewData.updateHandler)
			this._loadViewData.updateHandler.runWith(this._progresses.reduce((pv, cv) => pv + cv, 0) / this._progresses.length);
	}

	/** 获取资源数组 */
	private getResGroup(groupType: ResGroupType): [ string[], string[] ] {
		const notUIRes: string[] = [];
		const uiRes: string[] = [];
		let resArr: string[];
		switch (groupType) {
			case ResGroupType.Normal: resArr = this.getResArray(); break;
			case ResGroupType.Const: resArr = this.getConstResArray(); break;
			case ResGroupType.All: resArr = this.getResArray().concat(this.getConstResArray()); break;
			default: return [ null, null ];
		}
		resArr.forEach(res => {
			if (res.startsWith("res/ui/")) uiRes.push(res);
			else notUIRes.push(res);
		});
		return [ notUIRes, uiRes ];
	}
}