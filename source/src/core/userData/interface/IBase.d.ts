declare interface ICitta extends IDecodeObject<ICitta> {

}

declare interface IBase extends IDecodeObject<IBase> {
    
    /**签到时间 */
    signedInTime: number;
    /** 金币 */
    coin: number;
    /** 元宝 */
    vcoin: number;
    /** 精力 */
    vigor: number;
    /** 境界 */
    jingJie: number;
    /** 层数 */
    cengJi: number;
    /** 经验 */
    exp: number;
    /** 魔核 */
    moHe: number;
    /** 魔币 */
    moBi: number;
    /** 灵石 */
    spiritStones: number;
    /** 称号id */
    title: number;
    /** 帮会id */
    society: number;
    /** 门派id */
    sect: number;
    /** 魂魄 */
    soul: number;
    /** 宝石积分 */
    gemScore: number;
    /**心法数据 */
    citta: ICitta;
    /**技能数据 */
    skill: number[];
    /**出战技能 */
    usingSkill: number[];

    /** 升级经验 */
    get upgradeExp(): number;
    /** 获取最大精力 */
    get maxVigro(): number;
    /** 获取精力恢复 */
    get vigorRecover(): number;
}