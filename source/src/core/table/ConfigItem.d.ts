/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigItemData {
	/**id */
	readonly ID: number;
	/**名字 */
	readonly Name: string;
	/**品质 */
	readonly Quality: number;
	/**数据类型 */
	readonly DataType: number;
	/**背包类型 */
	readonly BagType: number;
	/**物品类型 */
	readonly ItemType: number;
	/**描述 */
	readonly Description: string;
	/**售卖获得物品 */
	readonly SellRewards: BaseDropOutType[];
	/**可使用境界 */
	readonly UseRequire: UseRequireType;
}

declare interface ConfigItem extends KeyMap<ConfigItemData> {
	/**金币 */
	readonly 1001: ConfigItemData;
	/**元宝 */
	readonly 1002: ConfigItemData;
	/**经验 */
	readonly 1003: ConfigItemData;
	/**魔核 */
	readonly 1004: ConfigItemData;
	/**魔币 */
	readonly 1005: ConfigItemData;
	/**灵石 */
	readonly 1006: ConfigItemData;
	/**魂魄 */
	readonly 1007: ConfigItemData;
	/**宝石积分 */
	readonly 1008: ConfigItemData;
	/**精力 */
	readonly 1009: ConfigItemData;
	/**1百万金币 */
	readonly 2000: ConfigItemData;
	/**1亿金币 */
	readonly 2001: ConfigItemData;
	/**50元宝 */
	readonly 2002: ConfigItemData;
	/**100元宝 */
	readonly 2003: ConfigItemData;
	/**500元宝 */
	readonly 2004: ConfigItemData;
	/**1000元宝 */
	readonly 2005: ConfigItemData;
	/**10000元宝 */
	readonly 2006: ConfigItemData;
	/**副本重置卡 */
	readonly 2007: ConfigItemData;
	/**秘境重置卡 */
	readonly 2008: ConfigItemData;
	/**BOSS重置卡 */
	readonly 2009: ConfigItemData;
	/**门派邀请函 */
	readonly 2010: ConfigItemData;
	/**首充礼包 */
	readonly 2011: ConfigItemData;
	/**碎石头 */
	readonly 3000: ConfigItemData;
	/**重铸石 */
	readonly 3001: ConfigItemData;
	/**绿松石 */
	readonly 3002: ConfigItemData;
	/**强化石 */
	readonly 3003: ConfigItemData;
	/**小魔石 */
	readonly 3004: ConfigItemData;
	/**玄星石 */
	readonly 3005: ConfigItemData;
	/**空冥石 */
	readonly 3006: ConfigItemData;
	/**龙血石 */
	readonly 3007: ConfigItemData;
	/**防爆符 */
	readonly 3008: ConfigItemData;
	/**卷轴·强化10 */
	readonly 3009: ConfigItemData;
	/**极冰石胆 */
	readonly 3010: ConfigItemData;
	/**神器碎片 */
	readonly 3011: ConfigItemData;
	/**古兰玉 */
	readonly 3012: ConfigItemData;
	/**青龙宝珠 */
	readonly 3013: ConfigItemData;
	/**朱雀宝珠 */
	readonly 3014: ConfigItemData;
	/**白虎宝珠 */
	readonly 3015: ConfigItemData;
	/**玄武宝珠 */
	readonly 3016: ConfigItemData;
	/**龙鳞 */
	readonly 3017: ConfigItemData;
	/**天罚残页 */
	readonly 3018: ConfigItemData;
	/**面包 */
	readonly 4000: ConfigItemData;
	/**汉堡 */
	readonly 4001: ConfigItemData;
	/**炒面 */
	readonly 4002: ConfigItemData;
	/**煎饼 */
	readonly 4003: ConfigItemData;
	/**烧鸡 */
	readonly 4004: ConfigItemData;
	/**牛排 */
	readonly 4005: ConfigItemData;
	/**蛋炒饭 */
	readonly 4006: ConfigItemData;
	/**咖喱饭 */
	readonly 4007: ConfigItemData;
	/**青椒肉丝 */
	readonly 4008: ConfigItemData;
	/**鱼香肉丝 */
	readonly 4009: ConfigItemData;
	/**技能·基本剑术 */
	readonly 5000: ConfigItemData;
	/**技能·元素之力 */
	readonly 5001: ConfigItemData;
	/**技能·即死魔法 */
	readonly 5002: ConfigItemData;
	/**技能·不败佛指 */
	readonly 5003: ConfigItemData;
	/**技能·催心魔咒 */
	readonly 5004: ConfigItemData;
	/**技能·飞雪龙闪 */
	readonly 5005: ConfigItemData;
	/**技能·圣火圣隐 */
	readonly 5006: ConfigItemData;
	/**技能·醉仙神剑 */
	readonly 5007: ConfigItemData;
	/**技能·断浪龙印 */
	readonly 5008: ConfigItemData;
	/**技能·金光乍现 */
	readonly 5009: ConfigItemData;
	/**技能·春木之歌 */
	readonly 5010: ConfigItemData;
	/**技能·鬼雾水刃 */
	readonly 5011: ConfigItemData;
	/**技能·火蛇之舞 */
	readonly 5012: ConfigItemData;
	/**技能·土流大河 */
	readonly 5013: ConfigItemData;
	/**技能·上苍之怒 */
	readonly 5014: ConfigItemData;
	/**技能·摩诃无量 */
	readonly 5015: ConfigItemData;
	/**技能·化功大法 */
	readonly 5016: ConfigItemData;
	/**技能·北冥神功 */
	readonly 5017: ConfigItemData;
	/**技能·炎龙无双 */
	readonly 5018: ConfigItemData;
	/**技能·斗转星移 */
	readonly 5019: ConfigItemData;
	/**技能·棒打狗头 */
	readonly 5020: ConfigItemData;
	/**技能·乾坤一掷 */
	readonly 5021: ConfigItemData;
	/**技能·驾轻就熟 */
	readonly 5022: ConfigItemData;
	/**技能·复活青炎 */
	readonly 5023: ConfigItemData;
	/**技能·越战越勇 */
	readonly 5024: ConfigItemData;
	/**技能·天罚 */
	readonly 5025: ConfigItemData;
	/**技能·不死之身 */
	readonly 5026: ConfigItemData;
	/**心法·天机卷 */
	readonly 6000: ConfigItemData;
	/**心法·玄心卷 */
	readonly 6001: ConfigItemData;
	/**心法·秋水卷 */
	readonly 6002: ConfigItemData;
	/**心法·逍遥卷 */
	readonly 6003: ConfigItemData;
	/**心法·离殇卷 */
	readonly 6004: ConfigItemData;
	/**心法·大雅卷 */
	readonly 6005: ConfigItemData;
	/**心法·七星卷 */
	readonly 6006: ConfigItemData;
	/**心法·阴阳卷 */
	readonly 6007: ConfigItemData;
	/**心法·战神图录 */
	readonly 6008: ConfigItemData;
	/**一级攻击宝石 */
	readonly 7000: ConfigItemData;
	/**二级攻击宝石 */
	readonly 7001: ConfigItemData;
	/**三级攻击宝石 */
	readonly 7002: ConfigItemData;
	/**四级攻击宝石 */
	readonly 7003: ConfigItemData;
	/**五级攻击宝石 */
	readonly 7004: ConfigItemData;
	/**六级攻击宝石 */
	readonly 7005: ConfigItemData;
	/**七级攻击宝石 */
	readonly 7006: ConfigItemData;
	/**八级攻击宝石 */
	readonly 7007: ConfigItemData;
	/**九级攻击宝石 */
	readonly 7008: ConfigItemData;
	/**十级攻击宝石 */
	readonly 7009: ConfigItemData;
	/**一级防御宝石 */
	readonly 7010: ConfigItemData;
	/**二级防御宝石 */
	readonly 7011: ConfigItemData;
	/**三级防御宝石 */
	readonly 7012: ConfigItemData;
	/**四级防御宝石 */
	readonly 7013: ConfigItemData;
	/**五级防御宝石 */
	readonly 7014: ConfigItemData;
	/**六级防御宝石 */
	readonly 7015: ConfigItemData;
	/**七级防御宝石 */
	readonly 7016: ConfigItemData;
	/**八级防御宝石 */
	readonly 7017: ConfigItemData;
	/**九级防御宝石 */
	readonly 7018: ConfigItemData;
	/**十级防御宝石 */
	readonly 7019: ConfigItemData;
	/**一级生命宝石 */
	readonly 7020: ConfigItemData;
	/**二级生命宝石 */
	readonly 7021: ConfigItemData;
	/**三级生命宝石 */
	readonly 7022: ConfigItemData;
	/**四级生命宝石 */
	readonly 7023: ConfigItemData;
	/**五级生命宝石 */
	readonly 7024: ConfigItemData;
	/**六级生命宝石 */
	readonly 7025: ConfigItemData;
	/**七级生命宝石 */
	readonly 7026: ConfigItemData;
	/**八级生命宝石 */
	readonly 7027: ConfigItemData;
	/**九级生命宝石 */
	readonly 7028: ConfigItemData;
	/**十级生命宝石 */
	readonly 7029: ConfigItemData;
	/**一级力量宝石 */
	readonly 7030: ConfigItemData;
	/**二级力量宝石 */
	readonly 7031: ConfigItemData;
	/**三级力量宝石 */
	readonly 7032: ConfigItemData;
	/**四级力量宝石 */
	readonly 7033: ConfigItemData;
	/**五级力量宝石 */
	readonly 7034: ConfigItemData;
	/**六级力量宝石 */
	readonly 7035: ConfigItemData;
	/**七级力量宝石 */
	readonly 7036: ConfigItemData;
	/**八级力量宝石 */
	readonly 7037: ConfigItemData;
	/**九级力量宝石 */
	readonly 7038: ConfigItemData;
	/**十级力量宝石 */
	readonly 7039: ConfigItemData;
	/**一级体力宝石 */
	readonly 7040: ConfigItemData;
	/**二级体力宝石 */
	readonly 7041: ConfigItemData;
	/**三级体力宝石 */
	readonly 7042: ConfigItemData;
	/**四级体力宝石 */
	readonly 7043: ConfigItemData;
	/**五级体力宝石 */
	readonly 7044: ConfigItemData;
	/**六级体力宝石 */
	readonly 7045: ConfigItemData;
	/**七级体力宝石 */
	readonly 7046: ConfigItemData;
	/**八级体力宝石 */
	readonly 7047: ConfigItemData;
	/**九级体力宝石 */
	readonly 7048: ConfigItemData;
	/**十级体力宝石 */
	readonly 7049: ConfigItemData;
	/**一级金攻宝石 */
	readonly 7050: ConfigItemData;
	/**二级金攻宝石 */
	readonly 7051: ConfigItemData;
	/**三级金攻宝石 */
	readonly 7052: ConfigItemData;
	/**四级金攻宝石 */
	readonly 7053: ConfigItemData;
	/**五级金攻宝石 */
	readonly 7054: ConfigItemData;
	/**六级金攻宝石 */
	readonly 7055: ConfigItemData;
	/**七级金攻宝石 */
	readonly 7056: ConfigItemData;
	/**八级金攻宝石 */
	readonly 7057: ConfigItemData;
	/**九级金攻宝石 */
	readonly 7058: ConfigItemData;
	/**十级金攻宝石 */
	readonly 7059: ConfigItemData;
	/**一级木攻宝石 */
	readonly 7060: ConfigItemData;
	/**二级木攻宝石 */
	readonly 7061: ConfigItemData;
	/**三级木攻宝石 */
	readonly 7062: ConfigItemData;
	/**四级木攻宝石 */
	readonly 7063: ConfigItemData;
	/**五级木攻宝石 */
	readonly 7064: ConfigItemData;
	/**六级木攻宝石 */
	readonly 7065: ConfigItemData;
	/**七级木攻宝石 */
	readonly 7066: ConfigItemData;
	/**八级木攻宝石 */
	readonly 7067: ConfigItemData;
	/**九级木攻宝石 */
	readonly 7068: ConfigItemData;
	/**十级木攻宝石 */
	readonly 7069: ConfigItemData;
	/**一级水攻宝石 */
	readonly 7070: ConfigItemData;
	/**二级水攻宝石 */
	readonly 7071: ConfigItemData;
	/**三级水攻宝石 */
	readonly 7072: ConfigItemData;
	/**四级水攻宝石 */
	readonly 7073: ConfigItemData;
	/**五级水攻宝石 */
	readonly 7074: ConfigItemData;
	/**六级水攻宝石 */
	readonly 7075: ConfigItemData;
	/**七级水攻宝石 */
	readonly 7076: ConfigItemData;
	/**八级水攻宝石 */
	readonly 7077: ConfigItemData;
	/**九级水攻宝石 */
	readonly 7078: ConfigItemData;
	/**十级水攻宝石 */
	readonly 7079: ConfigItemData;
	/**一级火攻宝石 */
	readonly 7080: ConfigItemData;
	/**二级火攻宝石 */
	readonly 7081: ConfigItemData;
	/**三级火攻宝石 */
	readonly 7082: ConfigItemData;
	/**四级火攻宝石 */
	readonly 7083: ConfigItemData;
	/**五级火攻宝石 */
	readonly 7084: ConfigItemData;
	/**六级火攻宝石 */
	readonly 7085: ConfigItemData;
	/**七级火攻宝石 */
	readonly 7086: ConfigItemData;
	/**八级火攻宝石 */
	readonly 7087: ConfigItemData;
	/**九级火攻宝石 */
	readonly 7088: ConfigItemData;
	/**十级火攻宝石 */
	readonly 7089: ConfigItemData;
	/**一级土攻宝石 */
	readonly 7090: ConfigItemData;
	/**二级土攻宝石 */
	readonly 7091: ConfigItemData;
	/**三级土攻宝石 */
	readonly 7092: ConfigItemData;
	/**四级土攻宝石 */
	readonly 7093: ConfigItemData;
	/**五级土攻宝石 */
	readonly 7094: ConfigItemData;
	/**六级土攻宝石 */
	readonly 7095: ConfigItemData;
	/**七级土攻宝石 */
	readonly 7096: ConfigItemData;
	/**八级土攻宝石 */
	readonly 7097: ConfigItemData;
	/**九级土攻宝石 */
	readonly 7098: ConfigItemData;
	/**十级土攻宝石 */
	readonly 7099: ConfigItemData;
	/**一级命中宝石 */
	readonly 7100: ConfigItemData;
	/**二级命中宝石 */
	readonly 7101: ConfigItemData;
	/**三级命中宝石 */
	readonly 7102: ConfigItemData;
	/**四级命中宝石 */
	readonly 7103: ConfigItemData;
	/**五级命中宝石 */
	readonly 7104: ConfigItemData;
	/**六级命中宝石 */
	readonly 7105: ConfigItemData;
	/**七级命中宝石 */
	readonly 7106: ConfigItemData;
	/**八级命中宝石 */
	readonly 7107: ConfigItemData;
	/**九级命中宝石 */
	readonly 7108: ConfigItemData;
	/**十级命中宝石 */
	readonly 7109: ConfigItemData;
	/**一级闪避宝石 */
	readonly 7110: ConfigItemData;
	/**二级闪避宝石 */
	readonly 7111: ConfigItemData;
	/**三级闪避宝石 */
	readonly 7112: ConfigItemData;
	/**四级闪避宝石 */
	readonly 7113: ConfigItemData;
	/**五级闪避宝石 */
	readonly 7114: ConfigItemData;
	/**六级闪避宝石 */
	readonly 7115: ConfigItemData;
	/**七级闪避宝石 */
	readonly 7116: ConfigItemData;
	/**八级闪避宝石 */
	readonly 7117: ConfigItemData;
	/**九级闪避宝石 */
	readonly 7118: ConfigItemData;
	/**十级闪避宝石 */
	readonly 7119: ConfigItemData;
	/**一级暴击宝石 */
	readonly 7120: ConfigItemData;
	/**二级暴击宝石 */
	readonly 7121: ConfigItemData;
	/**三级暴击宝石 */
	readonly 7122: ConfigItemData;
	/**四级暴击宝石 */
	readonly 7123: ConfigItemData;
	/**五级暴击宝石 */
	readonly 7124: ConfigItemData;
	/**六级暴击宝石 */
	readonly 7125: ConfigItemData;
	/**七级暴击宝石 */
	readonly 7126: ConfigItemData;
	/**八级暴击宝石 */
	readonly 7127: ConfigItemData;
	/**九级暴击宝石 */
	readonly 7128: ConfigItemData;
	/**十级暴击宝石 */
	readonly 7129: ConfigItemData;
	/**一级身法宝石 */
	readonly 7130: ConfigItemData;
	/**二级身法宝石 */
	readonly 7131: ConfigItemData;
	/**三级身法宝石 */
	readonly 7132: ConfigItemData;
	/**四级身法宝石 */
	readonly 7133: ConfigItemData;
	/**五级身法宝石 */
	readonly 7134: ConfigItemData;
	/**六级身法宝石 */
	readonly 7135: ConfigItemData;
	/**七级身法宝石 */
	readonly 7136: ConfigItemData;
	/**八级身法宝石 */
	readonly 7137: ConfigItemData;
	/**九级身法宝石 */
	readonly 7138: ConfigItemData;
	/**十级身法宝石 */
	readonly 7139: ConfigItemData;
	/**一级耐力宝石 */
	readonly 7140: ConfigItemData;
	/**二级耐力宝石 */
	readonly 7141: ConfigItemData;
	/**三级耐力宝石 */
	readonly 7142: ConfigItemData;
	/**四级耐力宝石 */
	readonly 7143: ConfigItemData;
	/**五级耐力宝石 */
	readonly 7144: ConfigItemData;
	/**六级耐力宝石 */
	readonly 7145: ConfigItemData;
	/**七级耐力宝石 */
	readonly 7146: ConfigItemData;
	/**八级耐力宝石 */
	readonly 7147: ConfigItemData;
	/**九级耐力宝石 */
	readonly 7148: ConfigItemData;
	/**十级耐力宝石 */
	readonly 7149: ConfigItemData;
	/**一级金防宝石 */
	readonly 7150: ConfigItemData;
	/**二级金防宝石 */
	readonly 7151: ConfigItemData;
	/**三级金防宝石 */
	readonly 7152: ConfigItemData;
	/**四级金防宝石 */
	readonly 7153: ConfigItemData;
	/**五级金防宝石 */
	readonly 7154: ConfigItemData;
	/**六级金防宝石 */
	readonly 7155: ConfigItemData;
	/**七级金防宝石 */
	readonly 7156: ConfigItemData;
	/**八级金防宝石 */
	readonly 7157: ConfigItemData;
	/**九级金防宝石 */
	readonly 7158: ConfigItemData;
	/**十级金防宝石 */
	readonly 7159: ConfigItemData;
	/**一级木防宝石 */
	readonly 7160: ConfigItemData;
	/**二级木防宝石 */
	readonly 7161: ConfigItemData;
	/**三级木防宝石 */
	readonly 7162: ConfigItemData;
	/**四级木防宝石 */
	readonly 7163: ConfigItemData;
	/**五级木防宝石 */
	readonly 7164: ConfigItemData;
	/**六级木防宝石 */
	readonly 7165: ConfigItemData;
	/**七级木防宝石 */
	readonly 7166: ConfigItemData;
	/**八级木防宝石 */
	readonly 7167: ConfigItemData;
	/**九级木防宝石 */
	readonly 7168: ConfigItemData;
	/**十级木防宝石 */
	readonly 7169: ConfigItemData;
	/**一级水防宝石 */
	readonly 7170: ConfigItemData;
	/**二级水防宝石 */
	readonly 7171: ConfigItemData;
	/**三级水防宝石 */
	readonly 7172: ConfigItemData;
	/**四级水防宝石 */
	readonly 7173: ConfigItemData;
	/**五级水防宝石 */
	readonly 7174: ConfigItemData;
	/**六级水防宝石 */
	readonly 7175: ConfigItemData;
	/**七级水防宝石 */
	readonly 7176: ConfigItemData;
	/**八级水防宝石 */
	readonly 7177: ConfigItemData;
	/**九级水防宝石 */
	readonly 7178: ConfigItemData;
	/**十级水防宝石 */
	readonly 7179: ConfigItemData;
	/**一级火防宝石 */
	readonly 7180: ConfigItemData;
	/**二级火防宝石 */
	readonly 7181: ConfigItemData;
	/**三级火防宝石 */
	readonly 7182: ConfigItemData;
	/**四级火防宝石 */
	readonly 7183: ConfigItemData;
	/**五级火防宝石 */
	readonly 7184: ConfigItemData;
	/**六级火防宝石 */
	readonly 7185: ConfigItemData;
	/**七级火防宝石 */
	readonly 7186: ConfigItemData;
	/**八级火防宝石 */
	readonly 7187: ConfigItemData;
	/**九级火防宝石 */
	readonly 7188: ConfigItemData;
	/**十级火防宝石 */
	readonly 7189: ConfigItemData;
	/**一级土防宝石 */
	readonly 7190: ConfigItemData;
	/**二级土防宝石 */
	readonly 7191: ConfigItemData;
	/**三级土防宝石 */
	readonly 7192: ConfigItemData;
	/**四级土防宝石 */
	readonly 7193: ConfigItemData;
	/**五级土防宝石 */
	readonly 7194: ConfigItemData;
	/**六级土防宝石 */
	readonly 7195: ConfigItemData;
	/**七级土防宝石 */
	readonly 7196: ConfigItemData;
	/**八级土防宝石 */
	readonly 7197: ConfigItemData;
	/**九级土防宝石 */
	readonly 7198: ConfigItemData;
	/**十级土防宝石 */
	readonly 7199: ConfigItemData;
	/**新手武器 */
	readonly 40000: ConfigItemData;
	/**新手头盔 */
	readonly 40001: ConfigItemData;
	/**新手项链 */
	readonly 40002: ConfigItemData;
	/**新手衣服 */
	readonly 40003: ConfigItemData;
	/**新手戒指 */
	readonly 40004: ConfigItemData;
	/**新手裤子 */
	readonly 40005: ConfigItemData;
	/**新手护符 */
	readonly 40006: ConfigItemData;
	/**新手鞋子 */
	readonly 40007: ConfigItemData;
	/**苍竹长剑 */
	readonly 40008: ConfigItemData;
	/**苍竹项链 */
	readonly 40009: ConfigItemData;
	/**苍竹戒指 */
	readonly 40010: ConfigItemData;
	/**苍竹护符 */
	readonly 40011: ConfigItemData;
	/**苍竹帽 */
	readonly 40012: ConfigItemData;
	/**苍竹衣 */
	readonly 40013: ConfigItemData;
	/**苍竹裤 */
	readonly 40014: ConfigItemData;
	/**苍竹鞋 */
	readonly 40015: ConfigItemData;
	/**平凡长剑 */
	readonly 40016: ConfigItemData;
	/**平凡项链 */
	readonly 40017: ConfigItemData;
	/**平凡戒指 */
	readonly 40018: ConfigItemData;
	/**平凡护符 */
	readonly 40019: ConfigItemData;
	/**平凡帽 */
	readonly 40020: ConfigItemData;
	/**平凡衣 */
	readonly 40021: ConfigItemData;
	/**平凡裤 */
	readonly 40022: ConfigItemData;
	/**平凡鞋 */
	readonly 40023: ConfigItemData;
	/**清风长剑 */
	readonly 40024: ConfigItemData;
	/**清风项链 */
	readonly 40025: ConfigItemData;
	/**清风戒指 */
	readonly 40026: ConfigItemData;
	/**清风护符 */
	readonly 40027: ConfigItemData;
	/**清风帽 */
	readonly 40028: ConfigItemData;
	/**清风衣 */
	readonly 40029: ConfigItemData;
	/**清风裤 */
	readonly 40030: ConfigItemData;
	/**清风鞋 */
	readonly 40031: ConfigItemData;
	/**星海长剑 */
	readonly 40032: ConfigItemData;
	/**星海项链 */
	readonly 40033: ConfigItemData;
	/**星海戒指 */
	readonly 40034: ConfigItemData;
	/**星海护符 */
	readonly 40035: ConfigItemData;
	/**星海帽 */
	readonly 40036: ConfigItemData;
	/**星海衣 */
	readonly 40037: ConfigItemData;
	/**星海裤 */
	readonly 40038: ConfigItemData;
	/**星海鞋 */
	readonly 40039: ConfigItemData;
	/**寂灭长剑 */
	readonly 40040: ConfigItemData;
	/**寂灭项链 */
	readonly 40041: ConfigItemData;
	/**寂灭戒指 */
	readonly 40042: ConfigItemData;
	/**寂灭护符 */
	readonly 40043: ConfigItemData;
	/**寂灭帽 */
	readonly 40044: ConfigItemData;
	/**寂灭衣 */
	readonly 40045: ConfigItemData;
	/**寂灭裤 */
	readonly 40046: ConfigItemData;
	/**寂灭鞋 */
	readonly 40047: ConfigItemData;
	/**烈焰长剑 */
	readonly 40048: ConfigItemData;
	/**烈焰项链 */
	readonly 40049: ConfigItemData;
	/**烈焰戒指 */
	readonly 40050: ConfigItemData;
	/**烈焰护符 */
	readonly 40051: ConfigItemData;
	/**烈焰帽 */
	readonly 40052: ConfigItemData;
	/**烈焰衣 */
	readonly 40053: ConfigItemData;
	/**烈焰裤 */
	readonly 40054: ConfigItemData;
	/**烈焰鞋 */
	readonly 40055: ConfigItemData;
	/**紫月长剑 */
	readonly 40056: ConfigItemData;
	/**紫月项链 */
	readonly 40057: ConfigItemData;
	/**紫月戒指 */
	readonly 40058: ConfigItemData;
	/**紫月护符 */
	readonly 40059: ConfigItemData;
	/**紫月帽 */
	readonly 40060: ConfigItemData;
	/**紫月衣 */
	readonly 40061: ConfigItemData;
	/**紫月裤 */
	readonly 40062: ConfigItemData;
	/**紫月鞋 */
	readonly 40063: ConfigItemData;
	/**踏雪长剑 */
	readonly 40064: ConfigItemData;
	/**踏雪项链 */
	readonly 40065: ConfigItemData;
	/**踏雪戒指 */
	readonly 40066: ConfigItemData;
	/**踏雪护符 */
	readonly 40067: ConfigItemData;
	/**踏雪帽 */
	readonly 40068: ConfigItemData;
	/**踏雪衣 */
	readonly 40069: ConfigItemData;
	/**踏雪裤 */
	readonly 40070: ConfigItemData;
	/**踏雪鞋 */
	readonly 40071: ConfigItemData;
	/**秋水长剑 */
	readonly 40072: ConfigItemData;
	/**秋水项链 */
	readonly 40073: ConfigItemData;
	/**秋水戒指 */
	readonly 40074: ConfigItemData;
	/**秋水护符 */
	readonly 40075: ConfigItemData;
	/**秋水帽 */
	readonly 40076: ConfigItemData;
	/**秋水衣 */
	readonly 40077: ConfigItemData;
	/**秋水裤 */
	readonly 40078: ConfigItemData;
	/**秋水鞋 */
	readonly 40079: ConfigItemData;
	/**破凡长剑 */
	readonly 40080: ConfigItemData;
	/**破凡项链 */
	readonly 40081: ConfigItemData;
	/**破凡戒指 */
	readonly 40082: ConfigItemData;
	/**破凡护符 */
	readonly 40083: ConfigItemData;
	/**破凡帽 */
	readonly 40084: ConfigItemData;
	/**破凡衣 */
	readonly 40085: ConfigItemData;
	/**破凡裤 */
	readonly 40086: ConfigItemData;
	/**破凡鞋 */
	readonly 40087: ConfigItemData;
	/**神木长剑 */
	readonly 40088: ConfigItemData;
	/**神木项链 */
	readonly 40089: ConfigItemData;
	/**神木戒指 */
	readonly 40090: ConfigItemData;
	/**神木护符 */
	readonly 40091: ConfigItemData;
	/**神木帽 */
	readonly 40092: ConfigItemData;
	/**神木衣 */
	readonly 40093: ConfigItemData;
	/**神木裤 */
	readonly 40094: ConfigItemData;
	/**神木鞋 */
	readonly 40095: ConfigItemData;
	/**九州神龙 */
	readonly 49996: ConfigItemData;
	/**骷髅战甲 */
	readonly 49997: ConfigItemData;
	/**观音泪 */
	readonly 49998: ConfigItemData;
	/**仙器 */
	readonly 49999: ConfigItemData;
}