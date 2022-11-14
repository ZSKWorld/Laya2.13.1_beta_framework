"use strict";
exports.__esModule = true;
exports.GameUtil = void 0;
var TableManager_1 = require("../core/table/TableManager");
var GameUtil = /** @class */ (function () {
    function GameUtil() {
    }
    GameUtil.decodeData = function (target, source) {
    };
    GameUtil.isEquip = function (id) { return !!TableManager_1.tableMgr.Equipment[id]; };
    GameUtil.isProp = function (id) { return !!TableManager_1.tableMgr.Props[id]; };
    GameUtil.isFood = function (id) { return !!TableManager_1.tableMgr.Food[id]; };
    GameUtil.isSkillBook = function (id) { return !!TableManager_1.tableMgr.SkillBook[id]; };
    GameUtil.isXinFaBook = function (id) { return !!TableManager_1.tableMgr.XinFaBook[id]; };
    /** 物品是否可以使用 */
    GameUtil.canUseItem = function (id) {
        var _a = [
            TableManager_1.tableMgr.Props[id], TableManager_1.tableMgr.Food[id], TableManager_1.tableMgr.SkillBook[id], TableManager_1.tableMgr.XinFaBook[id],
        ], prop = _a[0], food = _a[1], skillBook = _a[2], xinFaBook = _a[3];
        return prop || food || skillBook || xinFaBook;
    };
    return GameUtil;
}());
exports.GameUtil = GameUtil;
