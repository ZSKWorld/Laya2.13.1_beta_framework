/** 物品 */
declare interface IGoods extends IGoodsData, IDecodeObject<IGoodsData, IGoods> {

}

/** 装备 */
declare interface IEquipment extends IEquipmentData, IDecodeObject<IEquipmentData, IEquipment> {
    /** 装备部位 */
    get part(): EquipmentPart;

    createAttribute(): IEquipment;
}