import { GameUtil } from "../../common/GameUtil";

/** 数学工具类 */
export class MathUtil {
    static readonly Radian = Math.PI / 180;

    /** 角度转弧度 */
    static AngleToRadian(angle: number) { return angle * this.Radian; }

    /** 弧度转角度 */
    static RadianToAngle(radian: number) { return radian / this.Radian; }

    /**数字转中文数字 */
    static ToChineseNum(num: number) {
        const arr1 = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ];
        const arr2 = [ "", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿" ];
        if (!num || isNaN(num)) return "零";
        const english = num.toString().split("");
        let result = "";
        for (let i = 0, n = english.length; i < n; i++) {
            const des_i = n - 1 - i;// 倒序排列设值
            result = arr2[ i ] + result;
            const arr1_index = english[ des_i ];
            result = arr1[ arr1_index ] + result;
        }
        result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"); // 将【零千、零百】换成【零】 【十零】换成【十】
        result = result.replace(/零+/g, "零"); // 合并中间多个零为一个零
        result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); // 将【零亿】换成【亿】【零万】换成【万】
        result = result.replace(/亿万/g, "亿"); // 将【亿万】换成【亿】
        result = result.replace(/零+$/, ""); // 移除末尾的零
        // 将【一十】换成【十】
        result = result.replace(/^一十/g, "十");
        return result;
    }

    /**数字转组合数字 */
    static ToGroupNumber(num: number, fixed: number = 2) {
        if (num < 1e4) return num.toString();
        else if (num < 1e8) return (num / 1e4).toFixed(fixed) + "万";
        else if (num < 1e12) return (num / 1e8).toFixed(fixed) + "亿";
        else return (num / 1e12).toFixed(fixed) + "万亿";
    }

    /**生成uid */
    static CreateUID() {
        return (GameUtil.getServerTime() ** (Math.random() + 0.01)).toString(32).replace(".", "");
    }

    /** 
     * 返回min-max之间得随机整数
     * @param min 最小值整数(包含)
     * @param max 最大值整数(包含)
     * @returns
     */
    static RandomInt(min: number, max: number) {
        min = Math.floor(min);
        max = Math.floor(max) + 1;
        if (min >= max) return min;
        return Math.floor(min + (max - min) * Math.random());
    }

    /**
     * 数值限制
     * @param value 
     * @param min 
     * @param max 
     * @returns 
     */
    static Clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * 数值限制在0-1
     * @param value 
     * @returns 
     */
    static Clamp01(value: number) {
        return this.Clamp(value, 0, 1);
    }

    /** x从0平滑过渡到1 */
    public static SmoothStep(x: number): number {
        x = this.Clamp01(x);
        return (Math.sin(x * Math.PI - Math.PI / 2) + 1) / 2;
    }

    static TimeFormat(seconds: number, keepHour: boolean = true) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - hours * 3600 - mins * 60;
        const hoursStr = hours > 9 ? hours : "0" + hours;
        const minsStr = mins > 9 ? mins : "0" + mins;
        const secsStr = secs > 9 ? secs : "0" + secs;
        if (keepHour || hours > 0)
            return hoursStr + ":" + minsStr + ":" + secsStr;
        else if (mins > 0)
            return minsStr + ":" + secsStr;
        else
            return "00:" + secsStr;
    }

    static TimeFormatChinese(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - hours * 3600 - mins * 60;
        return (hours ? `${ hours }小时` : "") + ((hours || mins) ? `${ mins }分钟` : "") + `${ secs }秒`;
    }

    /** 随机颜色字符串 */
    static RandomColor() {
        return "#" + Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
            + Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
            + Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    }
}
