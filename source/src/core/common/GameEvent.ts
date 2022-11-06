import { LogicSceneType } from "../../logicScene/LogicSceneType";

export const enum GameEvent {
	/**
	 * 网络消息错误
	 * @param msg {@link UserOutput} 错误消息
	 */
	NetMsgError = "NetMsgError",
	/** socket连接 */
	SocketOpened = "SocketOpened",
	/** socket关闭 */
	SocketClosed = "SocketClosed",


	/**
	 * 切换场景
	 * @param sceneType 场景类型 {@link LogicSceneType}
	 * @param data 场景数据{@link Object }
	 */
	EnterScene = "EnterScene",
	/**
	 * 添加历练日志
	 * @param log string
	 */
	AddExperienceLog = "AddExperienceLog",
	/** 清理历练日志 */
	ClearExperienceLog = "ClearExperienceLog",
	/** 刷新日志显示 */
	RefreshExperienceLog = "RefreshExperienceLog",
}