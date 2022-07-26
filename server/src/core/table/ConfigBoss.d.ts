/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigBossData {
	readonly ID: number;
	/**名字 */
	readonly Name: string;
	/**描述 */
	readonly Description: string;
	/**战斗波次 */
	readonly BattleWave: number;
	/**最大回合 */
	readonly MaxHuiHe: number;
	/**冷却时间，秒 */
	readonly CoolTime: number;
	/**怪物等级 */
	readonly EnemyLevel: number;
	/**精力消耗 */
	readonly VigorCost: number;
	/**基础掉落 */
	readonly BaseDropOut: BaseDropOutType[];
	/**随机掉落 */
	readonly RandomDropOut: RandomDropOutType[];
	/**可出现的怪物 */
	readonly Enemy: number[];
}

declare interface ConfigBoss extends KeyMap<ConfigBossData> {
	/**独孤求败[color=#ff0000][绝对魔防][/color] */
	readonly 10001: ConfigBossData;
	/**洪七公[color=#ff0000][绝对物防][/color] */
	readonly 10002: ConfigBossData;
	/**东方不败[color=#ff0000][魔攻][/color] */
	readonly 10003: ConfigBossData;
}