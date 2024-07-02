/** This script is generated automatically, Please do not any modify! */
declare interface CfgXinFaBook {
	readonly [key: string]: CfgXinFaBookData;
	/** 心法·天机卷 */
	readonly 6000: CfgXinFaBookData;
	/** 心法·玄心卷 */
	readonly 6001: CfgXinFaBookData;
	/** 心法·秋水卷 */
	readonly 6002: CfgXinFaBookData;
	/** 心法·逍遥卷 */
	readonly 6003: CfgXinFaBookData;
	/** 心法·离殇卷 */
	readonly 6004: CfgXinFaBookData;
	/** 心法·大雅卷 */
	readonly 6005: CfgXinFaBookData;
	/** 心法·七星卷 */
	readonly 6006: CfgXinFaBookData;
	/** 心法·阴阳卷 */
	readonly 6007: CfgXinFaBookData;
	/** 心法·战神图录 */
	readonly 6008: CfgXinFaBookData;
}

declare interface CfgXinFaBookData {
	readonly [key: string]: any;
	/** id */
	readonly id: number;
	/**  */
	readonly name: string;
	/** 每级心法增加的精力恢复 */
	readonly vigorRecoverAddition: number;
	/** 每级心法增加的精力上限 */
	readonly vigorAddition: number;
	/** 对应技能 */
	readonly skills: number[];
}

