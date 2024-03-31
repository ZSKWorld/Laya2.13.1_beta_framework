/** 物品 */
declare interface IGoods extends IGoodsData, IDecodeObject<IGoodsData, IGoods> {
    get name(): string;
    get colorName(): string;
    get quality(): number;
    get color(): string;
    get description(): string;
    get salable(): number;
    get useRequire(): CfgItemData2;
    get useRequireStr(): string;
}

/** 装备 */
declare interface IEquipment extends IEquipmentData, IDecodeObject<IEquipmentData, IEquipment> {
    get name(): string;
    get colorName(): string;
    get quality(): number;
    get color(): string;
    get description(): string;
    get salable(): number;
    get useRequire(): CfgItemData2;
    get useRequireStr(): string;
    get part(): EquipmentPart;
    get levelName(): string;
    get colorLevelName(): string;
    get infoStr(): string;
}