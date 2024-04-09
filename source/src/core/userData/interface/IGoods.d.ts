/** 基础物品 */
declare interface IGoodsBase<T> extends IDecodeObject<T>{
    /** 物品id */
    id: number;
    get name(): string;
    get colorName(): string;
    get quality(): number;
    get color(): string;
    get description(): string;
    get salable(): number;
    get useRequire(): CfgItemData2;
    get useRequireStr(): string;
}

/** 物品 */
declare interface IGoods extends IGoodsBase<IGoods> {
    /** 物品数量 */
    count: number;
}

/** 装备 */
declare interface IEquipment extends IGoodsBase<IEquipment> {
    /** 装备uid，用于区分同id的不同装备 */
    uid: string;
    /** 装备id */
    id: number;
    /** 装备星级 */
    star: number;
    /** 强化等级 */
    level: number;
    /** 铭刻等级 */
    mingKe: number;
    /** 神佑等级 */
    shenYou: number;
    /** 主属性 */
    mainAttri: number[];
    /** 五行属性 */
    wuXingAttri: number[];
    /** 副属性 */
    secondAttri: number[];
    /** 体质属性 */
    bodyAttri: number[];

    /** 装备部位 => EquipmentPart */
    get part(): number;
    get levelName(): string;
    get colorLevelName(): string;
    get infoStr(): string;
}