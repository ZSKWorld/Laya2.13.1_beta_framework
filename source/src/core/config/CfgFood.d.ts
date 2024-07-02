/** This script is generated automatically, Please do not any modify! */
declare interface CfgFood {
	readonly [key: string]: CfgFoodData;
	/** 面包 */
	readonly 4000: CfgFoodData;
	/** 汉堡 */
	readonly 4001: CfgFoodData;
	/** 炒面 */
	readonly 4002: CfgFoodData;
	/** 煎饼 */
	readonly 4003: CfgFoodData;
	/** 烧鸡 */
	readonly 4004: CfgFoodData;
	/** 牛排 */
	readonly 4005: CfgFoodData;
	/** 蛋炒饭 */
	readonly 4006: CfgFoodData;
	/** 咖喱饭 */
	readonly 4007: CfgFoodData;
	/** 青椒肉丝 */
	readonly 4008: CfgFoodData;
	/** 鱼香肉丝 */
	readonly 4009: CfgFoodData;
}

declare interface CfgFoodData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 恢复类型 */
	readonly recoverType: number;
	/** 恢复值 */
	readonly recoverValue: number;
}

