/** This script is generated automatically, Please do not any modify! */
declare interface CfgEquipmentAddition {
	readonly [key: string]: CfgEquipmentAdditionData;
	/** 武器 */
	readonly 1: CfgEquipmentAdditionData;
	/** 头盔 */
	readonly 2: CfgEquipmentAdditionData;
	/** 项链 */
	readonly 3: CfgEquipmentAdditionData;
	/** 衣服 */
	readonly 4: CfgEquipmentAdditionData;
	/** 戒指 */
	readonly 5: CfgEquipmentAdditionData;
	/** 裤子 */
	readonly 6: CfgEquipmentAdditionData;
	/** 护符 */
	readonly 7: CfgEquipmentAdditionData;
	/** 鞋子 */
	readonly 8: CfgEquipmentAdditionData;
	/** 坐骑 */
	readonly 9: CfgEquipmentAdditionData;
	/** 时装 */
	readonly 10: CfgEquipmentAdditionData;
	/** 暗器 */
	readonly 11: CfgEquipmentAdditionData;
	/** 法宝 */
	readonly 12: CfgEquipmentAdditionData;
}

declare interface CfgEquipmentAdditionData {
	readonly [key: string]: any;
	/** id */
	readonly id: number;
	/**  */
	readonly name: string;
	/** 主属性可使用加成 */
	readonly main: number[];
	/** 五行属性可使用加成 */
	readonly wuXing: number[];
	/** 副属性可使用加成 */
	readonly second: number[];
	/** 体质属性可使用加成 */
	readonly body: number[];
}

