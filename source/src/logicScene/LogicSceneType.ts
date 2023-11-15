/** 逻辑场景类型枚举 */
export const enum LogicScene {
	PreScreen = "PreScene",
	InitScene = "InitScene",
	LoginScene = "LoginScene",
	MainScene = "MainScene",
	GameScene = "GameScene",
}

/** 逻辑场景 */
export interface IScene {
	readonly name: string;
	readonly views: Set<string>;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 资源加载前执行 */
	preEnter(): void;

	/** 进入场景，资源加载后执行 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}