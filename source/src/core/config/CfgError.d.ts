/** This script is generated automatically, Please do not any modify! */declare interface CfgError {	/** 未知的命令 */	1000: CfgErrorData;	/** 未知的数据类型 */	1001: CfgErrorData;	/** 用户不存在 */	1002: CfgErrorData;	/** 用户已存在 */	1003: CfgErrorData;	/** 账号为空 */	1004: CfgErrorData;	/** 密码为空 */	1005: CfgErrorData;	/** 昵称为空 */	1006: CfgErrorData;	/** 密码错误 */	1007: CfgErrorData;	/** 用户未登录 */	1008: CfgErrorData;	/** 账号已登陆 */	1009: CfgErrorData;	/** 异地登陆 */	1010: CfgErrorData;	/** 今日已签过到 */	1011: CfgErrorData;	/** 精力不足 */	1012: CfgErrorData;	/** 精力已满 */	1013: CfgErrorData;	/** 功能暂未开放 */	1014: CfgErrorData;	/** 数量错误 */	1015: CfgErrorData;	/** 境界不足，无法使用 */	1016: CfgErrorData;	/** 境界不足，无法穿戴 */	1017: CfgErrorData;	/** 品不存在 */	1018: CfgErrorData;	/** 物品数量不足 */	1019: CfgErrorData;	/** 当前部位未穿戴装备 */	1020: CfgErrorData;	/** 不能学习其他门派的技能 */	1021: CfgErrorData;	/** 你已经学习了此技能 */	1022: CfgErrorData;	/** 你已经学习了此心法 */	1023: CfgErrorData;	/** 物品不可出售 */	1024: CfgErrorData;	/** 物品不可使用 */	1025: CfgErrorData;	/** 商品不存在 */	1026: CfgErrorData;	/** 装备不能收藏 */	1027: CfgErrorData;	/** 已收藏过 */	1028: CfgErrorData;	/** 物品没有收藏过 */	1029: CfgErrorData;	/** 和对方还不是好友 */	1030: CfgErrorData;	/** 和对方已经是好友了 */	1031: CfgErrorData;	/** 未知的战斗类型 */	2000: CfgErrorData;	/** 未知的战斗关卡 */	2001: CfgErrorData;	/** 挑战次数不足 */	2002: CfgErrorData;	/** 冷却未完成 */	2003: CfgErrorData;	/** 战斗中 */	2004: CfgErrorData;	/** 未开始战斗 */	2005: CfgErrorData;	/** 采集中 */	2006: CfgErrorData;	/** 未开始采集 */	2007: CfgErrorData;}declare interface CfgErrorData {	/**  */	id: number;	/** 错误文本 */	text: string;}