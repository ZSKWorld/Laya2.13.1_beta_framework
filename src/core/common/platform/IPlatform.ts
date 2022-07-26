import { LangCode } from "../../table/LangCode";

export interface IPlatform {
    /**登录 */
    login(account: string, password: string): Promise<LangCode>;
    /**注册 */
    register(account: string, password: string, nickName: string): Promise<LangCode>;
    /**弹窗 */
    confirm(msg: string, confirmText: string, showCancel: boolean, success?: Function, fail?: Function): void;
}