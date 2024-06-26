/** This script is generated automatically, Please do not any modify! */
declare interface CfgProps {
	readonly [key: string]: CfgPropsData;
	/** 1百万金币 */
	readonly 2000: CfgPropsData;
	/** 1亿金币 */
	readonly 2001: CfgPropsData;
	/** 50元宝 */
	readonly 2002: CfgPropsData;
	/** 100元宝 */
	readonly 2003: CfgPropsData;
	/** 500元宝 */
	readonly 2004: CfgPropsData;
	/** 1000元宝 */
	readonly 2005: CfgPropsData;
	/** 10000元宝 */
	readonly 2006: CfgPropsData;
	/** 副本重置卡 */
	readonly 2007: CfgPropsData;
	/** 秘境重置卡 */
	readonly 2008: CfgPropsData;
	/** BOSS重置卡 */
	readonly 2009: CfgPropsData;
	/** 门派邀请函 */
	readonly 2010: CfgPropsData;
	/** 首充礼包 */
	readonly 2011: CfgPropsData;
	/** 首充礼包2 */
	readonly 2012: CfgPropsData;
	/** 微型经验胶囊 */
	readonly 2013: CfgPropsData;
	/** 小型经验胶囊 */
	readonly 2014: CfgPropsData;
	/** 中型经验胶囊 */
	readonly 2015: CfgPropsData;
	/** 大型经验胶囊 */
	readonly 2016: CfgPropsData;
	/** 巨型经验胶囊 */
	readonly 2017: CfgPropsData;
}

declare interface CfgPropsData {
	readonly [key: string]: any;
	/** id */
	readonly id: number;
	/**  */
	readonly name: string;
	/**  */
	readonly rewards: CfgPropsData1[];
}

declare interface CfgPropsData1 {
	readonly [key: string]: any;
	readonly id: number;
	readonly count: number;
}

