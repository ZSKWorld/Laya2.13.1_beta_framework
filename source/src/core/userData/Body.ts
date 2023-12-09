import { EquipmentPart } from "../net/enum/ItemEnum";
import { ClassName, Decode } from "./Decode";
import { Equipment } from "./Goods";

@ClassName("BodyData")
export class Body extends Decode<IBodyData> implements IBody {
    //#region 字段
    weapon: IEquipment;
    helmet: IEquipment;
    necklace: IEquipment;
    clothes: IEquipment;
    ring: IEquipment;
    trousers: IEquipment;
    amulet: IEquipment;
    shoes: IEquipment;
    mount: IEquipment;
    hiddenWeeapon: IEquipment;
    fashion: IEquipment;
    magicWeapon: IEquipment;
    weaponGems: number[];
    helmetGems: number[];
    necklaceGems: number[];
    clothesGems: number[];
    ringGems: number[];
    trousersGems: number[];
    amuletGems: number[];
    shoesGems: number[];
    //#endregion

    getDressedEquip(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weapon;
            case EquipmentPart.Helmet: return this.helmet;
            case EquipmentPart.Necklace: return this.necklace;
            case EquipmentPart.Clothes: return this.clothes;
            case EquipmentPart.Ring: return this.ring;
            case EquipmentPart.Trousers: return this.trousers;
            case EquipmentPart.Amulet: return this.amulet;
            case EquipmentPart.Shoes: return this.shoes;
            case EquipmentPart.Mount: return this.mount;
            case EquipmentPart.Fashion: return this.fashion;
            case EquipmentPart.HiddenWeeapon: return this.hiddenWeeapon;
            case EquipmentPart.MagicWeapon: return this.magicWeapon;
            default: return null;
        }
    }

    getEquipGems(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weaponGems;
            case EquipmentPart.Helmet: return this.helmetGems;
            case EquipmentPart.Necklace: return this.necklaceGems;
            case EquipmentPart.Clothes: return this.clothesGems;
            case EquipmentPart.Ring: return this.ringGems;
            case EquipmentPart.Trousers: return this.trousersGems;
            case EquipmentPart.Amulet: return this.amuletGems;
            case EquipmentPart.Shoes: return this.shoesGems;
            default: return null;
        }
    }

    protected override onDecode(data: IBodyData, key: keyof IBodyData) {
        switch (key) {
            case "weapon":
            case "helmet":
            case "necklace":
            case "clothes":
            case "ring":
            case "trousers":
            case "amulet":
            case "shoes":
            case "mount":
            case "hiddenWeeapon":
            case "fashion":
            case "magicWeapon": return data[key] ? (data[key] instanceof Equipment ? data[key] : new Equipment().decode(data[key])) : null;
            default: return data[key];
        }
    }

}