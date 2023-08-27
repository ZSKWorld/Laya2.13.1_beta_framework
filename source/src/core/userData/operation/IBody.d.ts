declare interface IBody extends IBodyData, IDecode<IBodyData, IBody> {
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

    getDressedEquip(part: EquipmentPart): IEquipment;
    
    getEquipGems(part: EquipmentPart): number[];
}