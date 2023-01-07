import { Observer } from "../core/libs/event/Observer";
import { loadMgr } from "../core/libs/load/LoadMgr";
import { uiMgr } from "../core/ui/core/UIManager";
import { ViewID } from "../core/ui/core/ViewID";
import { IScene } from "./ILogicScene";

const enum ResGroupType {
	Normal,
	Const,
	All,
}

type LoadViewData = { updateHandler?: Laya.Handler };

/** 逻辑场景基类 */
export abstract class LogicSceneBase extends Observer implements IScene {
	protected data: any;
	protected loadViewId: ViewID;
	private _loadViewData: LoadViewData = {};
	private _progress1: number;
	private _progress2: number;
	private _loadHandler1 = Laya.Handler.create(this, this.onLoadProgress1, null, false);
	private _loadHandler2 = Laya.Handler.create(this, this.onLoadProgress2, null, false);

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	load() {
		const [ notUIRes, uiRes ] = this.getResGroup(ResGroupType.All);
		this._progress1 = notUIRes.length ? 0 : 1;
		this._progress2 = uiRes.length ? 0 : 1;
		if (this.loadViewId) uiMgr.addView(this.loadViewId, this._loadViewData, null, false);
		this.updateLoadProgress();
		return Promise.all([
			this.loadViewId ? new Promise(resolve => Laya.timer.once(1000, null, resolve)) : null,
			loadMgr.create(notUIRes, null, this._loadHandler1),
			loadMgr.loadPackage(uiRes, null, this._loadHandler2),
		]).then(
			() => Promise.resolve(),
			() => Promise.reject<void>(this.exit())
		);
	}

	enter(data: any): void {
		this.data = data;
		this._loadViewData.updateHandler = null;
		uiMgr.removeAllView();
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
		uiRes.forEach(v => fgui.UIPackage.getById(v).unloadAssets());

	}

	/** 可卸载资源，场景退出时卸载 */
	protected getResArray(): string[] { return []; };

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray(): string[] { return []; };

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;

	private onLoadProgress1(progress: number) {
		this._progress1 = progress;
		this.updateLoadProgress();
	}
	private onLoadProgress2(progress: number) {
		this._progress2 = progress;
		this.updateLoadProgress();
	}

	private updateLoadProgress() {
		if (this._loadViewData.updateHandler)
			this._loadViewData.updateHandler.runWith((this._progress1 + this._progress2) / 2);
	}

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