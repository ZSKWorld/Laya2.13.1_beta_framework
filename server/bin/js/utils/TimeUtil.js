"use strict";
exports.__esModule = true;
exports.TimeUtil = void 0;
var TimeUtil = /** @class */ (function () {
    function TimeUtil() {
    }
    TimeUtil.getTimeStamp = function () { return Date.now(); };
    TimeUtil.getTimeSecStamp = function () { return (Date.now() / 1000) << 0; };
    return TimeUtil;
}());
exports.TimeUtil = TimeUtil;
