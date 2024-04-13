/**The script is automatically generated by BatMain.bat , please do not modify */
import * as fs from "fs";
import * as path from "path";

class CfgManager {
	/** 关卡 */
	readonly Level: CfgData<CfgLevel>;
	/** 副本 */
	readonly Copy: CfgData<CfgCopy>;
	/** 秘境 */
	readonly Secret: CfgData<CfgSecret>;
	/** Boss */
	readonly Boss: CfgData<CfgBoss>;
	/** 采集 */
	readonly Gather: CfgData<CfgGather>;
	/** 怪物 */
	readonly Enemy: CfgData<CfgEnemy>;
	/** 装备 */
	readonly Equipment: CfgData<CfgEquipment>;
	/** 装备加成 */
	readonly EquipmentAddition: CfgData<CfgEquipmentAddition>;
	/** 宝石 */
	readonly Gem: CfgData<CfgGem>;
	/** 道具 */
	readonly Props: CfgData<CfgProps>;
	/** 材料 */
	readonly Material: CfgData<CfgMaterial>;
	/** 食物 */
	readonly Food: CfgData<CfgFood>;
	/** 技能书 */
	readonly SkillBook: CfgData<CfgSkillBook>;
	/** 心法书 */
	readonly XinFaBook: CfgData<CfgXinFaBook>;
	/** 固定文本 */
	readonly Lang: CfgData<CfgLang>;
	/** 物品 */
	readonly Item: CfgData<CfgItem>;
	/** 境界 */
	readonly JingJie: CfgData<CfgJingJie>;
	/** 常量 */
	readonly Const: CfgData<CfgConst>;
	/** 称号 */
	readonly Title: CfgData<CfgTitle>;
	/** 门派 */
	readonly Sect: CfgData<CfgSect>;
	/** 商店 */
	readonly Shop: CfgData<CfgShop>;
	/** 颜色 */
	readonly Color: CfgData<CfgColor>;
	/** 错误码 */
	readonly Error: CfgData<CfgError>;

    load() {
		let cfgData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../res/config/Config.json")).toString());
		if (cfgData) {
			const keyMap = cfgData.keyMap;
			delete cfgData.keyMap;
			for (const cfgKey in cfgData) {
				const data = cfgData[ cfgKey ];
				Object.keys(data).forEach(dataKey => this.decodeData(data[ dataKey ], keyMap));
				this.cfgExtension(data);
				this[ cfgKey ] = data;
			}
		}
	}

	private decodeData(data: any, keyMap: any) {
		if (data == null) return;
		if (typeof data != "object") return;
		const isArray = Array.isArray(data);
		Object.keys(data).forEach((key) => {
			const temp = data[ key ];
			const type = temp?.constructor?.name;
			if (type == "Object")
				this.decodeData(temp, keyMap);
			else if (type == "Array")
				temp.forEach((v: any) => this.decodeData(v, keyMap));
			if (isArray) data[ key ] = temp;
			else {
				data[ keyMap[ key ] ] = temp;
				delete data[ key ];
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
export const cfgMgr = new CfgManager();