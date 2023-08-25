import { Observer } from "../core/libs/event/Observer";
import { loadMgr } from "../core/libs/load/LoadManager";
import { uiMgr } from "../core/ui/core/UIManager";
import { ViewID } from "../core/ui/core/ViewID";
import { IScene } from "./LogicSceneType";

const enum ResGroupType {
	Normal,
	Const,
	All,
}

type LoadViewData = { updateHandler?: Laya.Handler };

/** 逻辑场景基类 */
export abstract class LogicSceneBase<T> extends Observer implements IScene {
	views = new Set<ViewID>();
	/** 场景参数 */
	protected data: T;
	/** 加载时显示的load页面id */
	protected loadViewId: ViewID;
	/** load页面数据 */
	private _loadViewData: LoadViewData = {};
	/** 资源加载进度更新回调 */
	private _progressHandlers: Laya.Handler[] = [];
	/** 资源加载进度 */
	private _progresses: number[] = [];

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	load() {
		const resArr = this.getResGroup(ResGroupType.All);
		const [ uiRes, otherRes ] = resArr;
		let loadCount = resArr.length;
		this.setLoadProgres(loadCount);
		return Promise.all([
			loadMgr.loadPackage(uiRes, null, this._progressHandlers[ --loadCount ]),
			loadMgr.load(otherRes, null, this._progressHandlers[ --loadCount ]),
			//加个最短加载时间，避免loadjing页一闪而过
			this.loadViewId ? new Promise(resolve =>
				Laya.Tween.to(this._progresses, { 2: 1 }, 500, null, Laya.Handler.create(null, resolve), 0, true)
					.update = this._progressHandlers[ --loadCount ]) : null,
		]).then(
			() => {
				uiMgr.removeAllView();
			},
			() => {
				return Promise.reject<void>();
			}
		).finally(() => {
			this._loadViewData.updateHandler = null;
			this._progressHandlers.forEach(v => v.recover());
			this._progressHandlers.length = 0;
		});
	}

	enter(data: T) {
		this.data = data;
		this.onEnter();
	}

	exit() {
		this.onExit();
		if (this.loadViewId) {
			this._loadViewData.updateHandler = null;
			uiMgr.removeView(this.loadViewId);
		}
		//卸载资源
		this.clearRes(ResGroupType.Normal);
	}

	protected clearRes(type: ResGroupType) {
		const [ uiRes, otherRes ] = this.getResGroup(type);
		uiRes.forEach(v => {
			const res = fgui.UIPackage.getById(v);
			res && res.dispose();
		});
		otherRes.forEach(v => Laya.loader.clearRes(v));
	}

	/** 可卸载资源，场景退出时卸载 */
	protected getNormalResArray(): string[] { return []; };

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray(): string[] { return []; };

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;

	private setLoadProgres(length: number) {
		if (this.loadViewId) {
			length++;
			uiMgr.showView(this.loadViewId, this._loadViewData);
		}
		this._progresses.length = 0;
		this._progressHandlers.forEach(v => v.recover());
		this._progressHandlers.length = 0;
		for (let i = 0; i < length; i++) {
			this._progresses.push(0);
			this._progressHandlers.push(Laya.Handler.create(this, this.onProgress, [ i ], false));
		}
		this.onProgress(0, 0);
	}

	private onProgress(index: number, progress: number) {
		this._progresses[ index ] = progress;
		Laya.timer.callLater(this, this.updateProgres);
	}

	private updateProgres() {
		if (this._loadViewData.updateHandler) {
			const progress = this._progresses.reduce((pv, cv) => pv + cv, 0) / this._progresses.length;
			this._loadViewData.updateHandler.runWith(progress);
		}
	}

	/** 获取资源数组 */
	private getResGroup(groupType: ResGroupType): [ string[], string[] ] {
		const uiRes: string[] = [];
		const otherRes: string[] = [];
		let resArr: string[];
		switch (groupType) {
			case ResGroupType.Normal: resArr = this.getNormalResArray(); break;
			case ResGroupType.Const: resArr = this.getConstResArray(); break;
			case ResGroupType.All: resArr = this.getNormalResArray().concat(this.getConstResArray()); break;
			default: return [ [], [] ];
		}
		resArr.forEach(res => {
			if (res.startsWith("res/ui/")) uiRes.push(res);
			else otherRes.push(res);
		});
		return [ uiRes, otherRes ];
	}
}