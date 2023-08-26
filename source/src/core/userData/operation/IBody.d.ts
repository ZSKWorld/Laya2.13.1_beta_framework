declare interface IBody extends IBodyData, IDecode<IBodyData, IBody> {
    getDressedEquip(part: EquipmentPart): IEquipment;
    getEquipGems(part: EquipmentPart): number[];
}