/** This script is generated automatically, Please do not any modify! */declare interface CfgBoss {
	readonly [key: string]: CfgBossData;
	/** 独孤求败[color=#ff0000][绝对魔防][/color] */
	readonly 10001: CfgBossData;
	/** 洪七公[color=#ff0000][绝对物防][/color] */
	readonly 10002: CfgBossData;
	/** 东方不败[color=#ff0000][魔攻][/color] */
	readonly 10003: CfgBossData;
}

declare interface CfgBossData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 描述 */
	readonly desc: string;
	/** 初始可战斗次数 */
	readonly battleCount: number;
	/** 战斗波次 */
	readonly battleWave: number;
	/** 最大回合 */
	readonly maxRound: number;
	/** 冷却时间，秒 */
	readonly coolTime: number;
	/** 怪物等级 */
	readonly enemyLevel: number;
	/** 精力消耗 */
	readonly vigorCost: number;
	/** 基础掉落 */
	readonly baseDrapOut: CfgBossData1[];
	/** 随机掉落 */
	readonly randomDrapOut: CfgBossData2[];
	/** 可出现的怪物 */
	readonly enemy: number[];
}

declare interface CfgBossData1 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
}

declare interface CfgBossData2 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
	readonly probability: number;
	readonly probBase: number;
}

