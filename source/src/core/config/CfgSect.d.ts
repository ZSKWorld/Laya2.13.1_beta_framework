/** This script is generated automatically, Please do not any modify! */declare interface CfgSect {	/** 少林 */	101: CfgSectData;	/** 星宿 */	102: CfgSectData;	/** 天山 */	103: CfgSectData;	/** 明教 */	104: CfgSectData;	/** 慕容 */	105: CfgSectData;	/** 丐帮 */	106: CfgSectData;}declare interface CfgSectData {	/**  */	id: number;	/** 名字 */	name: string;	/** 属性 */	attribute: number[];	/** 定位 */	locate: string;	/** 攻击成长 */	atkFactor: number;	/** 防御成长 */	defFactor: number;	/** 生命成长 */	hpFactor: number;	/** 命中成长 */	hitFactor: number;	/** 闪避成长 */	dodFactor: number;	/** 暴击成长 */	criFactor: number;	/** 暴抗成长 */	crFactor: number;}