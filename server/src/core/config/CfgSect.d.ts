/** This script is generated automatically, Please do not any modify! */declare interface CfgSect {
	readonly [key: string]: CfgSectData;
	/** 少林 */
	readonly 101: CfgSectData;
	/** 星宿 */
	readonly 102: CfgSectData;
	/** 天山 */
	readonly 103: CfgSectData;
	/** 明教 */
	readonly 104: CfgSectData;
	/** 慕容 */
	readonly 105: CfgSectData;
	/** 丐帮 */
	readonly 106: CfgSectData;
}

declare interface CfgSectData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 属性 */
	readonly attribute: number[];
	/** 定位 */
	readonly locate: string;
	/** 攻击成长 */
	readonly atkFactor: number;
	/** 防御成长 */
	readonly defFactor: number;
	/** 生命成长 */
	readonly hpFactor: number;
	/** 命中成长 */
	readonly hitFactor: number;
	/** 闪避成长 */
	readonly dodFactor: number;
	/** 暴击成长 */
	readonly criFactor: number;
	/** 暴抗成长 */
	readonly crFactor: number;
}

