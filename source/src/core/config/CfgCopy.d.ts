/** This script is generated automatically, Please do not any modify! */declare interface CfgCopy {
	readonly [key: string]: CfgCopyData;
	/** 墓穴 */
	readonly 10001: CfgCopyData;
	/** 英雄墓园 */
	readonly 10002: CfgCopyData;
}

declare interface CfgCopyData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 描述 */
	readonly desc: string;
	/** 初始可战斗次数 */
	readonly battleCount: number;
	/** 最大回合 */
	readonly maxRound: number;
	/** 怪物等级 */
	readonly enemyLevel: number;
	/** 精力消耗 */
	readonly vigorCost: number;
	/** 战斗波次 */
	readonly battleWave: number;
	/** 基础掉落 */
	readonly baseDrapOut: CfgCopyData1[];
	/** 随机掉落 */
	readonly randomDrapOut: CfgCopyData2[];
	/** 可出现的怪物 */
	readonly enemy: number[];
}

declare interface CfgCopyData1 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
}

declare interface CfgCopyData2 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
	readonly probability: number;
	readonly probBase: number;
}

