import { EquipmentPart } from "../enum/ItemEnum";
import { DecodeObject } from "./DecodeObject";
import { Equipment } from "./Goods";

export class Body extends DecodeObject<IBody> implements IBody {
    /** 武器 */
    weapon: IEquipment = null;
    /** 头盔 */
    helmet: IEquipment = null;
    /** 项链 */
    necklace: IEquipment = null;
    /** 衣服 */
    clothes: IEquipment = null;
    /** 戒指 */
    ring: IEquipment = null;
    /** 裤子 */
    trousers: IEquipment = null;
    /** 护符 */
    amulet: IEquipment = null;
    /** 鞋子 */
    shoes: IEquipment = null;
    /** 坐骑 */
    mount: IEquipment = null;
    /** 暗器 */
    hiddenWeeapon: IEquipment = null;
    /** 时装 */
    fashion: IEquipment = null;
    /** 法宝 */
    magicWeapon: IEquipment = null;
    /** 武器上装备的宝石 */
    weaponGems: number[] = [];
    /** 头盔上装备的宝石 */
    helmetGems: number[] = [];
    /** 项链上装备的宝石 */
    necklaceGems: number[] = [];
    /** 衣服上装备的宝石 */
    clothesGems: number[] = [];
    /** 戒指上装备的宝石 */
    ringGems: number[] = [];
    /** 裤子上装备的宝石 */
    trousersGems: number[] = [];
    /** 护符上装备的宝石 */
    amuletGems: number[] = [];
    /** 鞋子上装备的宝石 */
    shoesGems: number[] = [];

    getDressedEquip(part: number): IEquipment {
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
    setDressedEquip(part: number, equip: IEquipment): void {
        switch (part) {
            case EquipmentPart.Weapon: this.weapon = equip; break;
            case EquipmentPart.Helmet: this.helmet = equip; break;
            case EquipmentPart.Necklace: this.necklace = equip; break;
            case EquipmentPart.Clothes: this.clothes = equip; break;
            case EquipmentPart.Ring: this.ring = equip; break;
            case EquipmentPart.Trousers: this.trousers = equip; break;
            case EquipmentPart.Amulet: this.amulet = equip; break;
            case EquipmentPart.Shoes: this.shoes = equip; break;
            case EquipmentPart.Mount: this.mount = equip; break;
            case EquipmentPart.Fashion: this.fashion = equip; break;
            case EquipmentPart.HiddenWeeapon: this.hiddenWeeapon = equip; break;
            case EquipmentPart.MagicWeapon: this.magicWeapon = equip; break;
            default: return null;
        }
    }

    protected override onDecode(data: OriginData<IBody>, key: OriginDataKeys<IBody>) {
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
            case "magicWeapon": return data[key] ? new Equipment().decode(data[key] as IEquipment) : null;

            default:
                const arr = this[key] as number[];
                arr.length = 0;
                arr.push(...(data[key] as number[]));
                return arr;
        }
    }
}