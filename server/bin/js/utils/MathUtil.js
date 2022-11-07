"use strict";
exports.__esModule = true;
exports.MathUtil = void 0;
/** 数学工具类 */
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /** 角度转弧度 */
    MathUtil.AngleToRadian = function (angle) { return angle * this.Radian; };
    /** 弧度转角度 */
    MathUtil.RadianToAngle = function (radian) { return radian / this.Radian; };
    /**
     * 返回min-max之间得随机整数
     * @param min 最小值整数(包含)
     * @param max 最大值整数(包含)
     * @returns
     */
    MathUtil.RandomInt = function (min, max) {
        min = Math.floor(min);
        max = Math.floor(max) + 1;
        if (min >= max)
            return min;
        return Math.floor(min + (max - min) * Math.random());
    };
    /**
     * 数值限制
     * @param value
     * @param min
     * @param max
     * @returns
     */
    MathUtil.Clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * 数值限制在0-1
     * @param value
     * @returns
     */
    MathUtil.Clamp01 = function (value) {
        return this.Clamp(value, 0, 1);
    };
    MathUtil.Radian = Math.PI / 180;
    return MathUtil;
}());
exports.MathUtil = MathUtil;
