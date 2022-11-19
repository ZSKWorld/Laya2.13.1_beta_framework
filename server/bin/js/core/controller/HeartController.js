"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.HeartController = void 0;
var TimeUtil_1 = require("../../utils/TimeUtil");
var BaseController_1 = require("./BaseController");
var HeartController = /** @class */ (function (_super) {
    __extends(HeartController, _super);
    function HeartController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeartController.prototype.heart = function (data) {
        if (this.connection.logined)
            this.response("heart", { timeStamp: TimeUtil_1.TimeUtil.getTimeStamp() });
    };
    HeartController.prototype.recover = function () {
        _super.prototype.recover.call(this);
        clearInterval(this._intervalId);
    };
    HeartController.prototype.onCreate = function () {
        var _this = this;
        _super.prototype.onCreate.call(this);
        this._intervalId = setInterval(function () { return _this.heart(null); }, 10000);
    };
    return HeartController;
}(BaseController_1.BaseController));
exports.HeartController = HeartController;
