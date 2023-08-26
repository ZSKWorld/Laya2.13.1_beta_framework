/** 物品 */
declare interface IGoods extends IGoodsData, IDecode<IGoodsData, IGoods> {

}

/** 装备 */
declare interface IEquipment extends IEquipmentData, IDecode<IEquipmentData, IEquipment> {
    get part(): EquipmentPart;
    get levelName():string;
    get colorLevelName():string;
    get infoStr():string;
}