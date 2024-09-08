export const enum DataType {
    /** 基础数据 */
    BaseData = 1,
    /** 背包数据 */
    BagData,
}

/**基础物品类型 */
export const enum BaseDataType {
    /**金币 */
    Coin = 1001,
    /**元宝 */
    Vcoin = 1002,
    /**经验 */
    Exp = 1003,
    /**魔核 */
    MoHe = 1004,
    /**魔币 */
    MoBi = 1005,
    /**灵石 */
    SpiritStones = 1006,
    /**魂魄 */
    Soul = 1007,
    /**宝石积分 */
    GemScore = 1008,
    /**精力 */
    Vigor = 1009,
}

/** 物品背包类型 */
export const enum ItemBagType {
    /**藏品 */
    Collect,
    /**装备 */
    Equip,
    /**道具 */
    Prop,
    /**宝石 */
    Gem,
    /**材料 */
    Material,
    /**书籍 */
    Book,
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