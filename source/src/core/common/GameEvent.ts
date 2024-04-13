export const enum GameEvent {
	/** 游戏回到前台事件 */
	OnGameShow = "OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "OnGameHide",
	/** 红点组件唤醒 */
	RedDotCompAwake = "RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "RedDotCompDestroy",

	/** 刷新日志显示 */
	RefreshExperienceLog = "RefreshExperienceLog",
}