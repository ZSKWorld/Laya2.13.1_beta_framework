/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigFuBenData {
	readonly ID: number;
	/**名字 */
	readonly Name: string;
	/**描述 */
	readonly Description: string;
	/**初始可战斗次数 */
	readonly BattleCount: number;
	/**最大回合 */
	readonly MaxHuiHe: number;
	/**怪物等级 */
	readonly EnemyLevel: number;
	/**精力消耗 */
	readonly VigorCost: number;
	/**战斗波次 */
	readonly BattleWave: number;
	/**基础掉落 */
	readonly BaseDropOut: BaseDropOutType[];
	/**随机掉落 */
	readonly RandomDropOut: RandomDropOutType[];
	/**可出现的怪物 */
	readonly Enemy: number[];
}

declare interface ConfigFuBen extends KeyMap<ConfigFuBenData> {
	/**墓穴 */
	readonly 10001: ConfigFuBenData;
	/**英雄墓园 */
	readonly 10002: ConfigFuBenData;
}