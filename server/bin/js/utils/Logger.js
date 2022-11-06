"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var colors = require("colors");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.setEnable = function (enable) { this._enable = enable; };
    Logger.log = function (txt, color) {
        if (color === void 0) { color = "white" /* Color.white */; }
        if (!this._enable)
            return;
        console.log(colors[color](txt));
    };
    Logger._enable = true;
    return Logger;
}());
exports.Logger = Logger;
