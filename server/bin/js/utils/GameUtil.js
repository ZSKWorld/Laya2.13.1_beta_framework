"use strict";
exports.__esModule = true;
exports.GameUtil = void 0;
var TableManager_1 = require("../core/table/TableManager");
var TimeUtil_1 = require("./TimeUtil");
var GameUtil = /** @class */ (function () {
    function GameUtil() {
    }
    GameUtil.isEquip = function (id) { return !!TableManager_1.tableMgr.Equipment[id]; };
    GameUtil.isProp = function (id) { return !!TableManager_1.tableMgr.Props[id]; };
    GameUtil.isFood = function (id) { return !!TableManager_1.tableMgr.Food[id]; };
    GameUtil.isSkillBook = function (id) { return !!TableManager_1.tableMgr.SkillBook[id]; };
    GameUtil.isXinFaBook = function (id) { return !!TableManager_1.tableMgr.XinFaBook[id]; };
    /** 获取可使用的物品 */
    GameUtil.getUsableItem = function (id) {
        var _a = [
            TableManager_1.tableMgr.Props[id], TableManager_1.tableMgr.Food[id], TableManager_1.tableMgr.SkillBook[id], TableManager_1.tableMgr.XinFaBook[id],
        ], prop = _a[0], food = _a[1], skillBook = _a[2], xinFaBook = _a[3];
        return prop || food || skillBook || xinFaBook;
    };
    /** 获取离线奖励 */
    GameUtil.getOffline = function (data) {
        if (!data.account.lastOnlineTime)
            return null;
        var timeOffset = ((TimeUtil_1.TimeUtil.getTimeStamp() - data.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5)
            return null;
        else
            return this.cantSyncObj({ offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate(data) * timeOffset) << 0 });
    };
    /** 获取精力回复速率 */
    GameUtil.getVigorRecoveryRate = function (data) {
        var citta = data.citta;
        var xinFaJLHF = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJLHF += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLHFAdd); });
        return 1 + xinFaJLHF;
    };
    /** 获取最大精力值 */
    GameUtil.getMaxVigro = function (data) {
        var citta = data.citta;
        var xinFaJL = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJL += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLAdd); });
        return Math.floor(86400 + xinFaJL);
    };
    /**境界转等级 */
    GameUtil.jingJieToLevel = function (jingJie, cengJi) {
        return (jingJie - 1) * (+TableManager_1.tableMgr.Const[1005].Value) + cengJi;
    };
    /**等级转境界 */
    GameUtil.levelToJingJie = function (level) {
        var jingJie = 0;
        var cengJi = 0;
        var maxCengJie = +TableManager_1.tableMgr.Const[1005].Value;
        if (level % maxCengJie == 0) {
            jingJie = level / maxCengJie;
            cengJi = maxCengJie;
        }
        else {
            jingJie = Math.floor(level / maxCengJie);
            cengJi = level - jingJie * maxCengJie;
            jingJie += 1;
        }
        return { jingJie: jingJie, cengJi: cengJi };
    };
    GameUtil.cantSyncObj = function (obj) {
        if (typeof obj == "object") {
            Object.defineProperty(obj, "CantSyncObj", {
                configurable: false,
                enumerable: false,
                value: true
            });
        }
        return obj;
    };
    return GameUtil;
}());
exports.GameUtil = GameUtil;
