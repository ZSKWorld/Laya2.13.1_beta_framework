/**The script is automatically generated by BatMain.bat , please do not modify */

export class CfgManager implements ICfgManager {
	/** 关卡 */
	readonly Level: CfgLevel & CfgExtension<CfgData<CfgLevel>>;
	/** 副本 */
	readonly Copy: CfgCopy & CfgExtension<CfgData<CfgCopy>>;
	/** 秘境 */
	readonly Secret: CfgSecret & CfgExtension<CfgData<CfgSecret>>;
	/** Boss */
	readonly Boss: CfgBoss & CfgExtension<CfgData<CfgBoss>>;
	/** 采集 */
	readonly Gather: CfgGather & CfgExtension<CfgData<CfgGather>>;
	/** 怪物 */
	readonly Enemy: CfgEnemy & CfgExtension<CfgData<CfgEnemy>>;
	/** 装备 */
	readonly Equipment: CfgEquipment & CfgExtension<CfgData<CfgEquipment>>;
	/** 装备加成 */
	readonly EquipmentAddition: CfgEquipmentAddition & CfgExtension<CfgData<CfgEquipmentAddition>>;
	/** 宝石 */
	readonly Gem: CfgGem & CfgExtension<CfgData<CfgGem>>;
	/** 道具 */
	readonly Props: CfgProps & CfgExtension<CfgData<CfgProps>>;
	/** 材料 */
	readonly Material: CfgMaterial & CfgExtension<CfgData<CfgMaterial>>;
	/** 食物 */
	readonly Food: CfgFood & CfgExtension<CfgData<CfgFood>>;
	/** 技能书 */
	readonly SkillBook: CfgSkillBook & CfgExtension<CfgData<CfgSkillBook>>;
	/** 心法书 */
	readonly XinFaBook: CfgXinFaBook & CfgExtension<CfgData<CfgXinFaBook>>;
	/** 固定文本 */
	readonly Lang: CfgLang & CfgExtension<CfgData<CfgLang>>;
	/** 物品 */
	readonly Item: CfgItem & CfgExtension<CfgData<CfgItem>>;
	/** 境界 */
	readonly JingJie: CfgJingJie & CfgExtension<CfgData<CfgJingJie>>;
	/** 常量 */
	readonly Const: CfgConst & CfgExtension<CfgData<CfgConst>>;
	/** 称号 */
	readonly Title: CfgTitle & CfgExtension<CfgData<CfgTitle>>;
	/** 门派 */
	readonly Sect: CfgSect & CfgExtension<CfgData<CfgSect>>;
	/** 商店 */
	readonly Shop: CfgShop & CfgExtension<CfgData<CfgShop>>;
	/** 颜色 */
	readonly Color: CfgColor & CfgExtension<CfgData<CfgColor>>;
	/** 错误码 */
	readonly Error: CfgError & CfgExtension<CfgData<CfgError>>;

	init() {
		let cfgData = Laya.loader.getRes(ResPath.ConfigPath.Config);
		if (cfgData) {
			const keyMap = cfgData.keyMap;
			delete cfgData.keyMap;
			for (const cfgKey in cfgData) {
				const data = cfgData[cfgKey];
				Object.keys(data).forEach(dataKey => this.decodeData(data[dataKey], keyMap));
				this.cfgExtension(data);
				this[cfgKey] = data;
			}
			Laya.loader.clearRes(ResPath.ConfigPath.Config);
			this.init = function () { };
		}
	}

	private decodeData(data: any, keyMap: any) {
		if (data == null) return;
		if (typeof data != "object") return;
		const isArray = Array.isArray(data);
		Object.keys(data).forEach((key) => {
			const temp = data[key];
			const type = temp?.constructor?.name;
			if (type == "Object")
				this.decodeData(temp, keyMap);
			else if (type == "Array")
				temp.forEach((v: any) => this.decodeData(v, keyMap));
			if (isArray) data[key] = temp;
			else {
				data[keyMap[key]] = temp;
				delete data[key];
			}
		});
	}

	private cfgExtension(cfg: any) {
		Object.defineProperty(cfg, "$data", {
			value: Object.keys(cfg).map(v => cfg[v]),
			enumerable: false,
		});
		const defineFun = (funName: string) => {
			Object.defineProperty(cfg, funName, {
				value: function (callbackfn: Function) { return this.$data[funName](callbackfn); },
				enumerable: false,
				configurable: false,
			});
		};
		[
			"forEach", "filter", "find", "every", "findIndex", "includes", "indexOf", "lastIndexOf", "map", "reduce", "slice", "some",
		].forEach(v => defineFun(v));
	}
}