
declare interface KeyData<T = number> { [ id: string ]: T; }
declare interface Offline {
    /** 离线时长 */
    offlineTime: number;
    /** 获得的精力 */
    vigor: number;
}
declare interface IUserData {
    uid: string;
    /** 昵称 */
    nickname: string;
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
    /** 注册时间戳 */
    registerTime: number;
    /** 最后一次登录时间戳 */
    lastLoginTime: number;
    /** 最后一次在线时间 */
    lastOnlineTime: number;
    /** 离线数据 */
    offline?: Offline;
    /** 背包数据 */
    bag: IBag;
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
    /** 武器 */
    weapon: Equipment;
    /** 头盔 */
    helmet: Equipment;
    /** 项链 */
    necklace: Equipment;
    /** 衣服 */
    clothes: Equipment;
    /** 戒指 */
    ring: Equipment;
    /** 裤子 */
    trousers: Equipment;
    /** 护符 */
    amulet: Equipment;
    /** 鞋子 */
    shoes: Equipment;
    /** 坐骑 */
    mount: Equipment;
    /** 暗器 */
    hiddenWeeapon: Equipment;
    /** 时装 */
    fashion: Equipment;
    /** 法宝 */
    magicWeapon: Equipment;
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
    /**关卡数据 */
    level: KeyData;
    /**副本数据 */
    copy: KeyData;
    /**秘境数据 */
    secret: KeyData;
    /**boss数据 */
    boss: KeyData;
    /**心法数据 */
    citta: KeyData;
    /**技能数据 */
    skill: number[];
    /**出战技能 */
    usingSkill: number[];
}