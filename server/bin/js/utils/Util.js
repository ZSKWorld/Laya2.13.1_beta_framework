"use strict";
exports.__esModule = true;
exports.Util = void 0;
var fs = require("fs");
var path = require("path");
var TimeUtil_1 = require("./TimeUtil");
var Util = /** @class */ (function () {
    function Util() {
    }
    /**生成uid */
    Util.CreateUID = function () {
        return (Math.pow(TimeUtil_1.TimeUtil.getTimeStamp(), (Math.random() + 0.01))).toString(32).replace(".", "");
    };
    Util.generateUUID = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var temp = 36;
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * temp) % temp | 0;
            d = Math.floor(d / temp);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(temp);
        });
        return uuid;
    };
    Util.getData = function (account) {
        var filePath = this.getDataPath(account);
        if (fs.existsSync(filePath) == false)
            return null;
        var conent = fs.readFileSync(filePath).toString();
        try {
            return JSON.parse(conent);
        }
        catch (error) {
            return null;
        }
    };
    Util.saveData = function (data) {
        var filePath = this.getDataPath(data.account);
        if (!filePath)
            return console.log("路径不存在", data.account, filePath);
        fs.writeFileSync(filePath, JSON.stringify(data));
    };
    Util.getDataPath = function (account) {
        if (!account)
            return null;
        var fileName = (account).split("").reduce(function (pValue, value) {
            return pValue + value.charCodeAt(0);
        }, "");
        return path.resolve(__dirname, "../../../data/" + fileName + ".json");
    };
    return Util;
}());
exports.Util = Util;
