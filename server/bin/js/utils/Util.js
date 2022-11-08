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
    Util.getData = function (account, password) {
        var filePath = this.getDataPath(account, password);
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
        var filePath = this.getDataPath(data.account, data.password);
        if (!filePath)
            return console.log("路径不存在", data.account, data.password, filePath);
        fs.writeFileSync(filePath, JSON.stringify(data));
    };
    Util.getDataPath = function (account, password) {
        if (!account || !password)
            return null;
        var fileName = (account + "" + password).split("").reduce(function (pValue, value) {
            return pValue + value.charCodeAt(0);
        }, "");
        return path.resolve(__dirname, "../../../data/" + fileName + ".json");
    };
    return Util;
}());
exports.Util = Util;
