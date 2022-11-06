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
    ACCOUNT_IS_EMPTY,
    /** 密码为空 */
    PASSWORD_IS_EMPTY,
    /** 昵称为空 */
    NICKNAME_IS_EMPTY,
    /** 异地登陆 */
    LOGIN_OTHER_PLACE,
    /** 精力不足 */
    VIGOR_NOT_ENOUGH,
    /** 功能暂未开放 */
    FUNCTION_NOT_OPENED,
    /** 数量错误 */
    NUMBER_ERROR,
    /** 境界不足，无法使用 */
    JINGJIE_NOT_ENOUGH_USE,
    /**物品不存在 */
    ITEM_NOT_EXIST,
    /** 物品数量不足 */
    ITEM_COUNT_NOT_ENOUGH,
    /** 当前部位未穿戴装备 */
    PART_NOT_DRESSED_EQUIP,
}