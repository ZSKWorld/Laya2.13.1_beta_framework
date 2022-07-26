import { jingJieToLevel } from "../libs/utils/Util";
import { AttributeType } from "./Interface";

export class Formula {

    /** x ^ 4 * 10 */
    static exp(jingJie: number, cengJi: number) {
        return jingJieToLevel(jingJie, cengJi) ** 4 * 100;
    }

    /** i ^ 2.3 * 100 */
    static baseATK(jingJie: number, cengJi: number) {
        return Math.floor(jingJieToLevel(jingJie, cengJi) ** 2.3 * 100);
    }

    /** i ^ 3 * 100 */
    static baseHP(jingJie: number, cengJi: number) {
        return jingJieToLevel(jingJie, cengJi) ** 3 * 100;
    }

    static equip_MainAttribute(type: AttributeType, jingJie: number, cengJi: number, star: number) {
        const level = jingJieToLevel(jingJie, cengJi);
        switch (type) {
            case AttributeType.GongJi: return 250 * (1.06 ** (star + level));
            case AttributeType.FangYu: return 255 * (1.06 ** (star + level));
            case AttributeType.ShengMing: return 625 * (1.06 ** (star + level));
            // case AttributeType.TiLi: return 10000;
            // case AttributeType.LiLiang: return 10000;
            // case AttributeType.NaiLi: return 10000;
            // case AttributeType.ShenFa: return 10000;
            // case AttributeType.MingZhong: return 10000;
            // case AttributeType.ShanBi: return 10000;
            // case AttributeType.BaoJi: return 10000;
            // case AttributeType.BaoKang: return 10000;
            // case AttributeType.BaoShang: return 10000;
            // case AttributeType.XiShou: return 10000;
            // case AttributeType.JinGong: return 10000;
            // case AttributeType.MuGong: return 10000;
            // case AttributeType.ShuiGong: return 10000;
            // case AttributeType.HuoGong: return 10000;
            // case AttributeType.TuGong: return 10000;
            // case AttributeType.JinFang: return 10000;
            // case AttributeType.MuFang: return 10000;
            // case AttributeType.ShuiFang: return 10000;
            // case AttributeType.HuoFang: return 10000;
            // case AttributeType.TuFang: return 10000;
            // case AttributeType.WuXingGongJi: return 10000;
            // case AttributeType.WuXingFangYu: return 10000;
            // case AttributeType.SuoYouShuXing: return 10000;
            // case AttributeType.ZuiZhongShangHai: return 10000;
            // case AttributeType.ZengJiaMingZhong: return 10000;
            // case AttributeType.ZengJiaBaoJi: return 10000;
            // case AttributeType.JianMianShangHai: return 10000;
            // case AttributeType.JianWuXingGongFang: return 10000;
            default: return 0;
        }
    }

    static equip_WuXingAttribute(type: AttributeType, jingJie: number, cengJi: number, star: number) {
        const level = jingJieToLevel(jingJie, cengJi);
        switch (type) {
            // case AttributeType.GongJi: return (star + level) ** 1.1 * 120;
            // case AttributeType.FangYu: return (star + level) ** 1.25 * 120;
            // case AttributeType.ShengMing: return (star + level) ** 1.3 * 300;
            // case AttributeType.TiLi: return 10000;
            // case AttributeType.LiLiang: return 10000;
            // case AttributeType.NaiLi: return 10000;
            // case AttributeType.ShenFa: return 10000;
            // case AttributeType.MingZhong: return 10000;
            // case AttributeType.ShanBi: return 10000;
            // case AttributeType.BaoJi: return 10000;
            // case AttributeType.BaoKang: return 10000;
            // case AttributeType.BaoShang: return 10000;
            // case AttributeType.XiShou: return 10000;
            case AttributeType.JinGong:
            case AttributeType.MuGong:
            case AttributeType.ShuiGong:
            case AttributeType.HuoGong:
            case AttributeType.TuGong:
            case AttributeType.JinFang:
            case AttributeType.MuFang:
            case AttributeType.ShuiFang:
            case AttributeType.HuoFang:
            case AttributeType.TuFang: return 10000;
            // case AttributeType.WuXingGongJi: return 10000;
            // case AttributeType.WuXingFangYu: return 10000;
            // case AttributeType.SuoYouShuXing: return 10000;
            // case AttributeType.ZuiZhongShangHai: return 10000;
            // case AttributeType.ZengJiaMingZhong: return 10000;
            // case AttributeType.ZengJiaBaoJi: return 10000;
            // case AttributeType.JianMianShangHai: return 10000;
            // case AttributeType.JianWuXingGongFang: return 10000;
            default: return 0;
        }
    }
}