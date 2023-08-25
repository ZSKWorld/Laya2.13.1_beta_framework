import { DecodeData } from "./DecodeData";

export class BagData extends DecodeData<IBag> implements IBag {
    private static readonly ClassName = "BagData";
    collect: number[];
    equipment: IEquipmentData[];
    gem: IItemBaseData[];
    prop: IItemBaseData[];
    material: IItemBaseData[];
    book: IItemBaseData[];
    other: IItemBaseData[];

}