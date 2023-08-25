declare interface IBodyData extends IDecode<IBodyData> {

    /** 武器 */
    weapon: IEquipmentData;
    /** 头盔 */
    helmet: IEquipmentData;
    /** 项链 */
    necklace: IEquipmentData;
    /** 衣服 */
    clothes: IEquipmentData;
    /** 戒指 */
    ring: IEquipmentData;
    /** 裤子 */
    trousers: IEquipmentData;
    /** 护符 */
    amulet: IEquipmentData;
    /** 鞋子 */
    shoes: IEquipmentData;
    /** 坐骑 */
    mount: IEquipmentData;
    /** 暗器 */
    hiddenWeeapon: IEquipmentData;
    /** 时装 */
    fashion: IEquipmentData;
    /** 法宝 */
    magicWeapon: IEquipmentData;
    /** 武器上装备的宝石 */
    weaponGems: number[];
    /** 头盔上装备的宝石 */
    helmetGems: number[];
    /** 项链上装备的宝石 */
    necklaceGems: number[];
    /** 衣服上装备的宝石 */
    clothesGems: number[];
    /** 戒指上装备的宝石 */
    ringGems: number[];
    /** 裤子上装备的宝石 */
    trousersGems: number[];
    /** 护符上装备的宝石 */
    amuletGems: number[];
    /** 鞋子上装备的宝石 */
    shoesGems: number[];
}