import { EquipmentPart } from "../enum/ItemEnum";
import { CantSyncObj } from "./CantSyncObj";

export class Body extends CantSyncObj implements IBody {
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
            case EquipmentPart.Weapon: this.weapon = equip;
            case EquipmentPart.Helmet: this.helmet = equip;
            case EquipmentPart.Necklace: this.necklace = equip;
            case EquipmentPart.Clothes: this.clothes = equip;
            case EquipmentPart.Ring: this.ring = equip;
            case EquipmentPart.Trousers: this.trousers = equip;
            case EquipmentPart.Amulet: this.amulet = equip;
            case EquipmentPart.Shoes: this.shoes = equip;
            case EquipmentPart.Mount: this.mount = equip;
            case EquipmentPart.Fashion: this.fashion = equip;
            case EquipmentPart.HiddenWeeapon: this.hiddenWeeapon = equip;
            case EquipmentPart.MagicWeapon: this.magicWeapon = equip;
            default: return null;
        }
    }
}