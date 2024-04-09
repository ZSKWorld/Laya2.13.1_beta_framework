declare interface IAccount extends IDecodeObject<IAccount> {
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
    get loginNextDay(): boolean;
    get onlineNextDay(): boolean;
}