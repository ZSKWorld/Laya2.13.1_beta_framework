/** This script is generated automatically, Please do not any modify! */
declare interface CfgGather extends ICfgExtension<CfgGatherData>, ICfgReadOnly<CfgGatherData> {
	/** 云罗山脉 */
	readonly 10001: CfgGatherData;
	/** 玄灵峡谷 */
	readonly 10002: CfgGatherData;
	/** 月牙湖 */
	readonly 10003: CfgGatherData;
}

declare interface CfgGatherData extends ICfgReadOnly {
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 采集次数 */
	readonly gatherCount: number;
	/** 采集时长，秒 */
	readonly gatherTime: number;
}

