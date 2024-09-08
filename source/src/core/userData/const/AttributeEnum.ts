

/**属性类型 */
export const enum AttributeEnum {
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