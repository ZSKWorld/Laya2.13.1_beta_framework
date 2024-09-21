import { Observer } from "../core/game/event/Observer";
import { IScene, SceneEvent, SceneType } from "./SceneDefine";

const enum ResGroupType {
	Normal,
	Const,
	All,
}

/** 逻辑场景基类 */
export abstract class LogicSceneBase<T> extends Observer implements IScene<T> {
	readonly type: SceneType;
	data: T;
	readonly views = new Set<ViewID>();
	/** 加载时显示的load页面id */
	protected loadViewId: ViewID;
	/** 资源加载进度更新回调 */
	private _progressHandlers: Laya.Handler[] = [];
	/** 资源加载进度 */
	private _progresses: number[] = [];

	/** 场景名称 */
	get name() { return this.constructor.name; }

	load() {
		this.dispatch(SceneEvent.OnLoadBegin, this.type);
		const resArr = this.getResGroup(ResGroupType.All);
		const [uiRes, skeletonRes, otherRes] = resArr;
		let loadCnt = this.setLoadProgres(resArr.length);
		return Promise.all([
			loadMgr.loadPackage(uiRes, null, this._progressHandlers[--loadCnt]),
			skeletonMgr.loadSkeleton(skeletonRes, this._progressHandlers[--loadCnt]),
			loadMgr.load(otherRes, null, this._progressHandlers[--loadCnt]),
			//加个最短加载时间，避免loadjing页一闪而过
			this.loadViewId ? new Promise(resolve => {
				const tween = Laya.Tween.to(this._progresses, { [--loadCnt]: 1 }, 500, null, Laya.Handler.create(null, resolve), 0, true);
				tween.update = this._progressHandlers[loadCnt];
			}) : null,
		]).then(
			() => {
				uiMgr.removeAllView();
			},
			() => {
				return Promise.reject<void>();
			}
		).finally(() => {
			this._progressHandlers.forEach(v => v.recover());
			this._progressHandlers.length = 0;
			this.dispatch(SceneEvent.OnLoadEnd, this.type);
		});
	}

	enter(data: T) {
		this.data = data;
		this.onEnter();
	}

	exit() {
		this.onExit();
		if (this.loadViewId) {
			uiMgr.removeView(this.loadViewId);
		}
		this.views.forEach(v => uiMgr.destroyView(v));
		this.clearRes(ResGroupType.Normal);
	}

	/**
	 * 清理场景资源
	 * @param type 要清理的资源类型
	 */
	protected clearRes(type: ResGroupType) {
		const [uiRes, skeletonRes, otherRes] = this.getResGroup(type);
		uiRes.forEach(v => {
			const res = fgui.UIPackage.getById(v);
			res && res.dispose();
		});
		skeletonRes.forEach(v => skeletonMgr.disposeSkeleton(v));
		otherRes.forEach(v => Laya.loader.clearRes(v));
	}

	/** 可卸载资源，场景退出时卸载 */
	protected getNormalResArray() { return [] as string[]; }

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray() { return [] as string[]; }

	protected onEnter() { }

	protected onExit() { }

	private setLoadProgres(count: number) {
		if (this.loadViewId) {
			count++;
			uiMgr.showView(this.loadViewId);
		}
		this._progresses.length = 0;
		this._progressHandlers.forEach(v => v.recover());
		this._progressHandlers.length = 0;
		for (let i = 0; i < count; i++) {
			this._progresses.push(0);
			this._progressHandlers.push(Laya.Handler.create(this, this.onProgress, [i], false));
		}
		this.onProgress(0, 0);
		return count;
	}

	private onProgress(index: number, progress: number) {
		progress != null && (this._progresses[index] = progress);
		let loadPro = this._progresses.reduce((pv, cv, i) => i > 0 ? pv + cv : pv, 0) / (this._progresses.length - 1);
		loadPro *= this._progresses[0];
		this.dispatch(SceneEvent.OnLoadProgress, loadPro);
	}

	/** 获取资源数组 */
	private getResGroup(groupType: ResGroupType): [string[], string[], string[]] {
		const uiRes: string[] = [];
		const skeletonRes: string[] = [];
		const otherRes: string[] = [];
		let resArr: string[];
		switch (groupType) {
			case ResGroupType.Normal: resArr = this.getNormalResArray(); break;
			case ResGroupType.Const: resArr = this.getConstResArray(); break;
			case ResGroupType.All: resArr = this.getNormalResArray().concat(this.getConstResArray()); break;
			default: return [[], [], []];
		}
		resArr.forEach(res => {
			if (res.startsWith("res/ui/")) uiRes.push(res);
			else if (res.endsWith(".sk")) skeletonRes.push(res);
			else otherRes.push(res);
		});
		return [uiRes, skeletonRes, otherRes];
	}
}