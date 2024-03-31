export const enum ErrorCode {
    NONE = 0,
    /** 未知的命令 */
    UNKNOWN_CMD = 1000,
    /** 未知的数据类型 */
    UNKNOWN_DATA_TYPE,
    /** 用户不存在 */
    USER_NOT_EXIST,
    /** 用户已存在 */
    USER_EXIST,
    /** 账号为空 */
    ACCOUNT_EMPTY,
    /** 密码为空 */
    PASSWORD_EMPTY,
    /** 昵称为空 */
    NICKNAME_EMPTY,
    /** 密码错误 */
    PASSWORD_ERROR,
    /** 用户未登录 */
    NOT_LOGIN,
    /** 账号已登陆 */
    USER_LOGINED,
    /** 异地登陆 */
    LOGIN_OTHER_PLACE,
    /** 今日已签过到 */
    HadSignedIn,
    /** 精力不足 */
    VIGOR_NOT_ENOUGH,
    /** 精力已满 */
    VIGOR_IS_FULL,
    /** 功能暂未开放 */
    FUNCTION_NOT_OPENED,
    /** 数量错误 */
    NUMBER_ERROR,
    /** 境界不足，无法使用 */
    JINGJIE_NOT_ENOUGH_USE,
    /** 境界不足，无法穿戴 */
    JINGJIE_NOT_ENOUGH_DRESS,
    /**物品不存在 */
    ITEM_NOT_EXIST,
    /** 物品数量不足 */
    ITEM_COUNT_NOT_ENOUGH,
    /** 当前部位未穿戴装备 */
    PART_NOT_DRESSED_EQUIP,
    /** 不能学习其他门派的技能 */
    CAN_NOT_STUDY_OTHER_SECT_SKILL,
    /** 你已经学习了此技能 */
    SKILL_IS_LEARNED,
    /** 你已经学习了此心法 */
    CITTA_IS_LEARNED,
    /** 物品不可出售 */
    ITEM_CAN_NOT_SELL,
    /** 物品不可使用 */
    ITEM_CAN_NOT_USE,
    /** 商品不存在 */
    GOODS_NOT_EXIST,
    /** 装备不能收藏 */
    EQUIP_CAN_NOT_COLLECT,
    /** 已收藏过 */
    ITEM_ALREADY_COLLECTED,
    /** 物品没有收藏过 */
    ITEM_DOES_NOT_COLLECT,
    /** 和对方还不是好友 */
    NOT_FRIEND,
    /** 和对方已经是好友了 */
    ALREADY_FRIEND,
    /** 未知的战斗类型 */
    UNKNOWN_BATTLE_TYPE = 2000,
    /** 未知的战斗关卡 */
    UNKNOWN_BATTLE_LEVEL,
    /** 挑战次数不足 */
    CHALLENGE_COUNT_NOT_ENOUGH,
    /** 冷却未完成 */
    COOLDOWN_NOT_COMPLETE,
    /** 战斗中 */
    ALREADY_IN_BATTLE,
    /** 未开始战斗 */
    NOT_IN_BATTLE,
}