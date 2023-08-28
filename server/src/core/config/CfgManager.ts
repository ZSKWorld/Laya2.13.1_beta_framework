/**The script is automatically generated by BatMain.bat , please do not modify */
import * as fs from "fs";
import * as path from "path";

class CfgManager {
	/** 关卡 */
	readonly Level: CfgLevel;
	/** 副本 */
	readonly FuBen: CfgFuBen;
	/** 秘境 */
	readonly MiJing: CfgMiJing;
	/** Boss */
	readonly Boss: CfgBoss;
	/** 采集 */
	readonly CaiJi: CfgCaiJi;
	/** 怪物 */
	readonly Enemy: CfgEnemy;
	/** 装备 */
	readonly Equipment: CfgEquipment;
	/** 装备加成 */
	readonly EquipmentAddition: CfgEquipmentAddition;
	/** 宝石 */
	readonly Gem: CfgGem;
	/** 道具 */
	readonly Props: CfgProps;
	/** 材料 */
	readonly Material: CfgMaterial;
	/** 食物 */
	readonly Food: CfgFood;
	/** 技能书 */
	readonly SkillBook: CfgSkillBook;
	/** 心法书 */
	readonly XinFaBook: CfgXinFaBook;
	/** 固定文本 */
	readonly Lang: CfgLang;
	/** 物品 */
	readonly Item: CfgItem;
	/** 境界 */
	readonly JingJie: CfgJingJie;
	/** 常量 */
	readonly Const: CfgConst;
	/** 称号 */
	readonly Title: CfgTitle;
	/** 门派 */
	readonly Sect: CfgSect;
	/** 商店 */
	readonly Shop: CfgShop;
	/** 颜色 */
	readonly Color: CfgColor;
	/** 错误码 */
	readonly Error: CfgError;

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

	private cfgExtension(cfg: ICfgExtension<any>) {
		cfg[ "$data" ] = Object.keys(cfg).map(v => cfg[ v ]);
		cfg.forEach = function (callbackfn: (value: any, index: number, array: any[]) => void) {
			this.$data.forEach(callbackfn);
		};
		cfg.filter = function (predicate: (value: any, index: number, array: any[]) => unknown) {
			return this.$data.filter(predicate);
		};
		cfg.find = function (predicate: (value: any, index: number, obj: any[]) => unknown) {
			return this.$data.find(predicate);
		};
	}
}
export const cfgMgr = new CfgManager();