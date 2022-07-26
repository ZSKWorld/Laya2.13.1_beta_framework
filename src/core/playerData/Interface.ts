

/**数据类型 */
export const enum DataType {
    /**基础数据 */
    Base = 1,
    /**背包数据 */
    Bag,
}
/**基础物品类型 */
export const enum BaseItemType {
    /**金币 */
    JinBi = 1001,
    /**元宝 */
    YuanBao = 1002,
    /**经验 */
    JingYan = 1003,
    /**魔核 */
    MoHe = 1004,
    /**魔币 */
    MoBi = 1005,
    /**灵石 */
    LingShi = 1006,
    /**魂魄 */
    HunPo = 1007,
    /**宝石积分 */
    GemScore = 1008,
    /**精力 */
    JingLi = 1009,
}

/**背包类型 */
export const enum BagType {
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
    Book,
    /**其他 */
    Other,
}

/**装备部位 */
export const enum EquipmentPart {
    /**武器 */
    WuQi = 1,
    /**头盔 */
    TouKui,
    /**项链 */
    XiangLian,
    /**衣服 */
    YiFu,
    /**戒指 */
    JieZhi,
    /**裤子 */
    KuZi,
    /**护符 */
    HuFu,
    /**鞋子 */
    XieZi,

    /**坐骑 */
    ZuoQi,
    /**时装 */
    ShiZhuang,
    /**暗器 */
    AnQi,
    /**法宝 */
    FaBao,
}

/**属性类型 */
export const enum AttributeType {
    /**攻击 */
    GongJi = 1,
    /**防御 */
    FangYu,
    /**生命 */
    ShengMing,
    /**体力，影响生命 */
    TiLi,
    /**力量，影响攻击 */
    LiLiang,
    /**耐力，影响防御 */
    NaiLi,
    /**身法，影响命中，闪避，暴击，暴抗 */
    ShenFa,
    /**命中 */
    MingZhong,
    /**闪避 */
    ShanBi,
    /**暴击 */
    BaoJi,
    /**暴抗 */
    BaoKang,
    /**暴伤 */
    BaoShang,
    /**吸收 */
    XiShou,
    /**金攻 */
    JinGong,
    /**木攻 */
    MuGong,
    /**水攻 */
    ShuiGong,
    /**火攻 */
    HuoGong,
    /**土攻 */
    TuGong,
    /**金防 */
    JinFang,
    /**木防 */
    MuFang,
    /**水防 */
    ShuiFang,
    /**火防 */
    HuoFang,
    /**土防 */
    TuFang,
    /**五行攻击 */
    WuXingGongJi,
    /**五行防御 */
    WuXingFangYu,
    /**所有属性，影响力量，体力，身法，耐力 */
    SuoYouShuXing,
    /**最终伤害 */
    ZuiZhongShangHai,
    /**增加命中，百分比 */
    ZengJiaMingZhong,
    /**增加暴击，百分比 */
    ZengJiaBaoJi,
    /**减免伤害，百分比 */
    JianMianShangHai,
    /**减五行攻防，百分比 */
    JianWuXingGongFang,
}

/**战斗类型 */
export const enum BattleType {
    GuanQia = 1,
    FuBen,
    MiJing,
    Boss,
    CaiJi
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
