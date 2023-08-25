/** 基础物品 */
declare interface IItemBase extends IItemBaseData{

}

/** 装备 */
declare interface IEquipment extends IEquipmentData {
    /** 装备部位 EquipmentPart */
    get part(): number;
    createAttribute(): IEquipment;
}