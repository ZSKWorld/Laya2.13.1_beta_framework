/** This script is generated automatically, Please do not any modify! */declare interface CfgCopy {	/** 墓穴 */	10001: CfgCopyData;	/** 英雄墓园 */	10002: CfgCopyData;}declare interface CfgCopyData {	/**  */	id: number;	/** 名字 */	name: string;	/** 描述 */	desc: string;	/** 初始可战斗次数 */	battleCount: number;	/** 最大回合 */	maxRound: number;	/** 怪物等级 */	enemyLevel: number;	/** 精力消耗 */	vigorCost: number;	/** 战斗波次 */	battleWave: number;	/** 基础掉落 */	baseDrapOut: CfgCopyData1[];	/** 随机掉落 */	randomDrapOut: CfgCopyData2[];	/** 可出现的怪物 */	enemy: number[];}declare interface CfgCopyData1 {	id: number;	count: number;}declare interface CfgCopyData2 {	id: number;	count: number;	probability: number;	probBase: number;}