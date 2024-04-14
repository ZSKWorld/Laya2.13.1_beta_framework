/** This script is generated automatically, Please do not any modify! */declare interface CfgLevel {
	readonly [key: string]: CfgLevelData;
	/** 小树林 */
	readonly 10001: CfgLevelData;
	/** 清秋道 */
	readonly 10002: CfgLevelData;
	/** 星月坡 */
	readonly 10003: CfgLevelData;
	/** 月牙谷 */
	readonly 10004: CfgLevelData;
	/** 亡灵谷 */
	readonly 10005: CfgLevelData;
	/** 栖云洞 */
	readonly 10006: CfgLevelData;
}

declare interface CfgLevelData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 描述 */
	readonly desc: string;
	/** 战斗波次 */
	readonly battleWave: number;
	/** 最大回合 */
	readonly maxRound: number;
	/** 怪物等级 */
	readonly enemyLevel: number;
	/** 精力消耗 */
	readonly vigorCost: number;
	/** 基础掉落 */
	readonly baseDrapOut: CfgLevelData1[];
	/** 随机掉落 */
	readonly randomDrapOut: CfgLevelData2[];
	/** 可出现的怪物 */
	readonly enemy: number[];
}

declare interface CfgLevelData1 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
}

declare interface CfgLevelData2 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
	readonly probability: number;
	readonly probBase: number;
}

