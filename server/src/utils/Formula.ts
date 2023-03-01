import { BaseHelper } from "../core/controller/base/BaseHelper";

export class Formula {

    /** x ^ 4 * 10 */
    static exp(jingJie: number, cengJi: number) {
        return BaseHelper.jingJieToLevel(jingJie, cengJi) ** 4 * 100;
    }

    /** i ^ 2.3 * 100 */
    static atk(jingJie: number, cengJi: number) {
        return Math.floor(BaseHelper.jingJieToLevel(jingJie, cengJi) ** 2.3 * 100);
    }

    /** i ^ 3 * 100 */
    static hp(jingJie: number, cengJi: number) {
        return BaseHelper.jingJieToLevel(jingJie, cengJi) ** 3 * 100;
    }
}