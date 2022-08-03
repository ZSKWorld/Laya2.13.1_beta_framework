import { Observer } from '../../core/libs/event/Observer';
import { loadMgr } from '../../core/libs/load/LoadMgr';
import { uiMgr } from '../../core/ui/core/UIManager';
import { IScene } from '../ILogicScene';

/**
 *@Author zsk
 *@Date 2022/7/25 22:02
 *@Description
 */
export abstract class LogicSceneBase extends Observer implements IScene {
	protected data: any;

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	load() {
		const [ normalRes, uiRes ] = this.getResGroup(true);
		// let totalProgress = 0;
		// const progressHandler = Laya.Handler.create(this, (progress: number) => {
		// 	totalProgress += progress;
		// }, null, false);
		return Promise.all([
			loadMgr.create(normalRes),
			loadMgr.loadPackage(uiRes),
		]).then(() => Promise.resolve(), () => {
			this.exit();
			return Promise.reject();
		});
	}

	enter(data: any): void {
		//todo
		this.data = data;
		this.onEnter();
	}

	exit(): void {
		//todo
		this.onExit();
		uiMgr.removeAllView();

		//卸载资源
		const [ normalRes, uiRes ] = this.getResGroup(false);
		normalRes.forEach(v => Laya.loader.clearRes(v));
		uiRes.forEach(v => fgui.UIPackage.removePackage(v));
		Laya.Resource.destroyUnusedResources();

	}

	/** 可卸载资源，场景退出时卸载 */
	protected getResArray(): string[] { return []; };

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray(): string[] { return []; };

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;

	private getResGroup(inclueConst: boolean): [ string[], string[], string[] ] {
		const normalRes: string[] = [];
		const uiRes: string[] = [];
		let resArr = this.getResArray();
		inclueConst && (resArr = resArr.concat(this.getConstResArray()));
		resArr.forEach(res => {
			if (res.startsWith("res/ui/")) uiRes.push(res);
			else normalRes.push(res);
		});
		return [ normalRes, uiRes, resArr ];
	}
}