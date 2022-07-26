/**
 *@Author zsk
 *@Date 2022/7/25 21:43
 *@Description
 */
export interface IScene {
	readonly name: string;

	/** 获取进入场景要加载的资源数组 */
	getResArray(): string[];

	/** 进入场景 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}