/** This script is generated automatically, Please do not any modify! */declare interface CfgGather {
	readonly [key: string]: CfgGatherData;
	/** 云罗山脉 */
	readonly 10001: CfgGatherData;
	/** 玄灵峡谷 */
	readonly 10002: CfgGatherData;
	/** 月牙湖 */
	readonly 10003: CfgGatherData;
}

declare interface CfgGatherData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 采集次数 */
	readonly gatherCount: number;
}

