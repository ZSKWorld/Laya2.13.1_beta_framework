import { Observer } from "../core/libs/event/Observer";
import { loadMgr } from "../core/libs/load/LoadMgr";
import { uiMgr } from "../core/ui/core/UIManager";
import { IScene } from "./ILogicScene";

const enum ResGroupType {
	Normal,
	Const,
	All,
}

/** 逻辑场景基类 */
export abstract class LogicSceneBase extends Observer implements IScene {
	protected data: any;

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	load() {
		const [ notUIRes, uiRes ] = this.getResGroup(ResGroupType.All);
		// let totalProgress = 0;
		// const progressHandler = Laya.Handler.create(this, (progress: number) => {
		// 	totalProgress += progress;
		// }, null, false);
		return Promise.all([
			loadMgr.create(notUIRes),
			loadMgr.loadPackage(uiRes),
		]).then(() => Promise.resolve(), () => {
			this.exit();
			return Promise.reject();
		});
	}

	enter(data: any): void {
		//todo
		this.data = data;
		uiMgr.removeAllView();
		this.onEnter();
	}

	exit(): void {
		//todo
		this.onExit();
		//卸载资源
		const [ notUIRes, uiRes ] = this.getResGroup(ResGroupType.Normal);
		notUIRes.forEach(v => Laya.loader.clearRes(v));
		uiRes.forEach(v => fgui.UIPackage.removePackage(v));

	}

	/** 可卸载资源，场景退出时卸载 */
	protected getResArray(): string[] { return []; };

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray(): string[] { return []; };

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;

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