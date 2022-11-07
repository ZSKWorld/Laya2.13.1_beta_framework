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
exports.Equipment = void 0;
var Util_1 = require("../../utils/Util");
var ItemBase_1 = require("./ItemBase");
var Equipment = /** @class */ (function (_super) {
    __extends(Equipment, _super);
    function Equipment(id) {
        var _this = _super.call(this, id, 1) || this;
        _this.uid = Util_1.Util.CreateUID();
        _this.star = 0;
        _this.level = 0;
        _this.mingKe = 0;
        _this.shenYou = 0;
        return _this;
    }
    return Equipment;
}(ItemBase_1.ItemBase));
exports.Equipment = Equipment;
