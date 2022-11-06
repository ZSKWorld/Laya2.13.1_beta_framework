"use strict";
exports.__esModule = true;
exports.UserDataUtil = void 0;
var TableManager_1 = require("../table/TableManager");
var UserDataUtil = /** @class */ (function () {
    function UserDataUtil() {
    }
    /** 获取对应境界最大精力 */
    UserDataUtil.getMaxVigro = function (citta) {
        var xinFaJL = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJL += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLAdd); });
        return Math.floor(86400 + xinFaJL);
    };
    /** 获取精力恢复速率 */
    UserDataUtil.getVigorRecoveryRate = function (citta) {
        var xinFaJLHF = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJLHF += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLHFAdd); });
        return 1 + xinFaJLHF;
    };
    return UserDataUtil;
}());
exports.UserDataUtil = UserDataUtil;
