/** This script is generated automatically, Please do not any modify! */
declare interface CfgSkillBook {
	readonly [key: string]: CfgSkillBookData;
	/** 技能·基本剑术 */
	readonly 5000: CfgSkillBookData;
	/** 技能·元素之力 */
	readonly 5001: CfgSkillBookData;
	/** 技能·即死魔法 */
	readonly 5002: CfgSkillBookData;
	/** 技能·不败佛指 */
	readonly 5003: CfgSkillBookData;
	/** 技能·催心魔咒 */
	readonly 5004: CfgSkillBookData;
	/** 技能·飞雪龙闪 */
	readonly 5005: CfgSkillBookData;
	/** 技能·圣火圣隐 */
	readonly 5006: CfgSkillBookData;
	/** 技能·醉仙神剑 */
	readonly 5007: CfgSkillBookData;
	/** 技能·断浪龙印 */
	readonly 5008: CfgSkillBookData;
	/** 技能·金光乍现 */
	readonly 5009: CfgSkillBookData;
	/** 技能·春木之歌 */
	readonly 5010: CfgSkillBookData;
	/** 技能·鬼雾水刃 */
	readonly 5011: CfgSkillBookData;
	/** 技能·火蛇之舞 */
	readonly 5012: CfgSkillBookData;
	/** 技能·土流大河 */
	readonly 5013: CfgSkillBookData;
	/** 技能·上苍之怒 */
	readonly 5014: CfgSkillBookData;
	/** 技能·摩诃无量 */
	readonly 5015: CfgSkillBookData;
	/** 技能·化功大法 */
	readonly 5016: CfgSkillBookData;
	/** 技能·北冥神功 */
	readonly 5017: CfgSkillBookData;
	/** 技能·炎龙无双 */
	readonly 5018: CfgSkillBookData;
	/** 技能·斗转星移 */
	readonly 5019: CfgSkillBookData;
	/** 技能·棒打狗头 */
	readonly 5020: CfgSkillBookData;
	/** 技能·乾坤一掷 */
	readonly 5021: CfgSkillBookData;
	/** 技能·驾轻就熟 */
	readonly 5022: CfgSkillBookData;
	/** 技能·复活青炎 */
	readonly 5023: CfgSkillBookData;
	/** 技能·越战越勇 */
	readonly 5024: CfgSkillBookData;
	/** 技能·天罚 */
	readonly 5025: CfgSkillBookData;
	/** 技能·不死之身 */
	readonly 5026: CfgSkillBookData;
}

declare interface CfgSkillBookData {
	readonly [key: string]: any;
	/**  */
	readonly id: number;
	/** 名字 */
	readonly name: string;
	/** 可学习的门派，不填则所有门派可学 */
	readonly sectRequire: number[];
	/** 对应心法 */
	readonly xinFa: number;
}

