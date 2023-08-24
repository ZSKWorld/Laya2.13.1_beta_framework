export const enum GameEvent {
	/** 游戏回到前台事件 */
	OnGameShow = "OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "OnGameHide",
	/** 红点组件唤醒 */
	RedDotCompAwake = "RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "RedDotCompDestroy",
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