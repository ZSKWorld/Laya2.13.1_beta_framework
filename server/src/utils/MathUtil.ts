/** 数学工具类 */
export class MathUtil {
    static readonly Radian = Math.PI / 180;

    /** 角度转弧度 */
    static AngleToRadian(angle: number) { return angle * this.Radian; }

    /** 弧度转角度 */
    static RadianToAngle(radian: number) { return radian / this.Radian; }

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
}
