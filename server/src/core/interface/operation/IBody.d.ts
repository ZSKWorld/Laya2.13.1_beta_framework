declare interface IBody extends IBodyData, IDecode<IBodyData, IBody> {
    /** 获取已穿戴装备 */
    getDressedEquip(part: number): IEquipment;
    /** 设置穿戴装备 */
    setDressedEquip(part: number, equip: IEquipment): void;
}