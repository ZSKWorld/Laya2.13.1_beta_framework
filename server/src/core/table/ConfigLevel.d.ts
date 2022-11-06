/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigLevelData {
	readonly ID: number;
	/**名字 */
	readonly Name: string;
	/**描述 */
	readonly Description: string;
	/**战斗波次 */
	readonly BattleWave: number;
	/**最大回合 */
	readonly MaxHuiHe: number;
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

declare interface ConfigLevel extends KeyMap<ConfigLevelData> {
	/**小树林 */
	readonly 10001: ConfigLevelData;
	/**清秋道 */
	readonly 10002: ConfigLevelData;
	/**星月坡 */
	readonly 10003: ConfigLevelData;
	/**月牙谷 */
	readonly 10004: ConfigLevelData;
	/**亡灵谷 */
	readonly 10005: ConfigLevelData;
	/**栖云洞 */
	readonly 10006: ConfigLevelData;
}