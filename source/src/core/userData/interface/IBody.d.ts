declare interface IBody extends IDecodeObject<IBody> {
    /** 武器 */
    weapon: IEquipment;
    /** 头盔 */
    helmet: IEquipment;
    /** 项链 */
    necklace: IEquipment;
    /** 衣服 */
    clothes: IEquipment;
    /** 戒指 */
    ring: IEquipment;
    /** 裤子 */
    trousers: IEquipment;
    /** 护符 */
    amulet: IEquipment;
    /** 鞋子 */
    shoes: IEquipment;
    /** 坐骑 */
    mount: IEquipment;
    /** 暗器 */
    hiddenWeeapon: IEquipment;
    /** 时装 */
    fashion: IEquipment;
    /** 法宝 */
    magicWeapon: IEquipment;
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

    /** @param part {@link EquipmentPart } */
    getDressedEquip(part: number): IEquipment;

    /** @param part {@link EquipmentPart } */
    getEquipGems(part: number): number[];
}