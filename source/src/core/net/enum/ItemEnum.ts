export const enum DataType{
    /** 基础数据 */
    BaseData = 1,
    /** 背包数据 */
    BagData,
}
/** 物品背包类型 */
export const enum ItemBagType{
    /**藏品 */
    ShouCang,
    /**装备 */
    Equip,
    /**道具 */
    Prop,
    /**宝石 */
    Gem,
    /**材料 */
    Material,
    /**书籍 */
    SkillBook,
    /**其他 */
    Other,
}

/**装备部位 */
export const enum EquipmentPart {
    /**武器 */
    Weapon = 1,
    /**头盔 */
    Helmet,
    /**项链 */
    Necklace,
    /**衣服 */
    Clothes,
    /**戒指 */
    Ring,
    /**裤子 */
    Trousers,
    /**护符 */
    Amulet,
    /**鞋子 */
    Shoes,

    /**坐骑 */
    Mount,
    /**时装 */
    Fashion,
    /**暗器 */
    HiddenWeeapon,
    /**法宝 */
    MagicWeapon,
}

/**食物回复类型 */
export const enum FoodRecoverType {
    /**固定数值回复 */
    NumberRecover = 1,
    /**时间回复 */
    TimeRecover,
    /**百分比回复 */
    PercentRecover,
}