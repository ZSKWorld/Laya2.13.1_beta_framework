import { DecodeData } from "./DecodeData";

export class BodyData extends DecodeData<IBody> implements IBody {
    private static readonly ClassName = "BodyData";
    weapon: IEquipmentData;
    helmet: IEquipmentData;
    necklace: IEquipmentData;
    clothes: IEquipmentData;
    ring: IEquipmentData;
    trousers: IEquipmentData;
    amulet: IEquipmentData;
    shoes: IEquipmentData;
    mount: IEquipmentData;
    hiddenWeeapon: IEquipmentData;
    fashion: IEquipmentData;
    magicWeapon: IEquipmentData;
    weaponGems: number[];
    helmetGems: number[];
    necklaceGems: number[];
    clothesGems: number[];
    ringGems: number[];
    trousersGems: number[];
    amuletGems: number[];
    shoesGems: number[];

}