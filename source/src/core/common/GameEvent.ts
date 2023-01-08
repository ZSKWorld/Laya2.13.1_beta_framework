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
	 * 添加历练日志
	 * @param log string
	 */
	AddExperienceLog = "AddExperienceLog",
	/** 清理历练日志 */
	ClearExperienceLog = "ClearExperienceLog",
	/** 刷新日志显示 */
	RefreshExperienceLog = "RefreshExperienceLog",
}