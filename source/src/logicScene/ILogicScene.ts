/** 逻辑场景 */
export interface IScene {
	readonly name: string;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 进入场景 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}