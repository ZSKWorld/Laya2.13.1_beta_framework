import { Observer } from '../../core/libs/event/Observer';
import { uiMgr } from '../../core/ui/core/UIManager';
import { IScene } from '../IScene';

/**
 *@Author zsk
 *@Date 2022/7/25 22:02
 *@Description
 */
export abstract class BaseScene extends Observer implements IScene {
	protected data: any;

	/** 场景名称 */
	get name(): string { return this[ "__proto__" ].constructor.name; }

	enter(data: any): void {
		//todo
		this.data = data;
		this.onEnter();
	}

	exit(): void {
		//todo
		uiMgr.removeAllView();
		Laya.Resource.destroyUnusedResources();
		this.onExit();
	}

	abstract getResArray(): string[];

	/** 进入场景时执行 */
	protected abstract onEnter(): void;

	/** 退出场景时执行 */
	protected abstract onExit(): void;
}