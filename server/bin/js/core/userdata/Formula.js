"use strict";
exports.__esModule = true;
exports.Formula = void 0;
var GameUtil_1 = require("../../utils/GameUtil");
var Formula = /** @class */ (function () {
    function Formula() {
    }
    /** x ^ 4 * 10 */
    Formula.exp = function (jingJie, cengJi) {
        return Math.pow(GameUtil_1.GameUtil.jingJieToLevel(jingJie, cengJi), 4) * 100;
    };
    /** i ^ 2.3 * 100 */
    Formula.atk = function (jingJie, cengJi) {
        return Math.floor(Math.pow(GameUtil_1.GameUtil.jingJieToLevel(jingJie, cengJi), 2.3) * 100);
    };
    /** i ^ 3 * 100 */
    Formula.hp = function (jingJie, cengJi) {
        return Math.pow(GameUtil_1.GameUtil.jingJieToLevel(jingJie, cengJi), 3) * 100;
    };
    return Formula;
}());
exports.Formula = Formula;
