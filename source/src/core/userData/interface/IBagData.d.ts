declare interface IBagData extends IDecode<IBagData> {
    collect: number[];
    equipment: IEquipmentData[];
    gem: IItemBaseData[];
    prop: IItemBaseData[];
    material: IItemBaseData[];
    book: IItemBaseData[];
    other: IItemBaseData[];
}