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
}