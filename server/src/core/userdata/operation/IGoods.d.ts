/** 物品 */
declare interface IGoods extends IGoodsData, IDecode<IGoodsData, IGoods> {

}

/** 装备 */
declare interface IEquipment extends IEquipmentData, IDecode<IEquipmentData, IEquipment> {
    /** 装备部位 */
    get part(): EquipmentPart;

    createAttribute(): IEquipment;
}