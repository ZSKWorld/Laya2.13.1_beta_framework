/** 逻辑场景类型枚举 */
export const enum SceneType {
	PreScreen = "PreScene",
	InitScene = "InitScene",
	LoginScene = "LoginScene",
	MainScene = "MainScene",
	GameScene = "GameScene",
	LittleGameScene = "LittleGameScene",
}

/** 逻辑场景 */
export interface IScene<T = any> {
	readonly type: SceneType;
	readonly name: string;
	/** 场景打开数据 */
	readonly data: T;
	readonly views: Set<string>;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 进入场景，资源加载后执行 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}

export const enum SceneEvent {
	/** 场景开始加载 */
	OnLoadBegin = "SceneEvent_OnLoadBegin",
	/** 场景加载进度 */
	OnLoadProgress = "SceneEvent_OnLoadProgress",
	/** 场景加载结束 */
	OnLoadEnd = "SceneEvent_OnLoadEnd",
	/** 进入场景 */
	OnEnterScene = "SceneEvent_OnEnterScene",
}