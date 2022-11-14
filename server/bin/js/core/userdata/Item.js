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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Equipment = exports.ItemBase = void 0;
var MathUtil_1 = require("../../utils/MathUtil");
var Util_1 = require("../../utils/Util");
var TableManager_1 = require("../table/TableManager");
var ItemBase = /** @class */ (function () {
    function ItemBase(id, count) {
        this.id = 0;
        this.count = 0;
        this.id = id;
        this.count = count;
    }
    return ItemBase;
}());
exports.ItemBase = ItemBase;
var Equipment = /** @class */ (function (_super) {
    __extends(Equipment, _super);
    function Equipment(id) {
        var _this = _super.call(this, id, 1) || this;
        _this.uid = Util_1.Util.CreateUID();
        _this.star = 0;
        _this.level = 0;
        _this.mingKe = 0;
        _this.shenYou = 0;
        _this.mainAttri = [];
        _this.wuXingAttri = [];
        _this.secondAttri = [];
        _this.bodyAttri = [];
        var equipInfo = TableManager_1.tableMgr.Equipment[id];
        if (equipInfo) {
            var _a = TableManager_1.tableMgr.EquipmentAddition[equipInfo.Part], Main = _a.Main, WuXing = _a.WuXing, Second = _a.Second, Body = _a.Body;
            _this.star = MathUtil_1.MathUtil.RandomInt(1, +TableManager_1.tableMgr.Const[1010].Value);
            Equipment.randomAttribute(__spreadArray([], Main, true), _this.mainAttri, false).sort(Equipment.sortFunc);
            Equipment.randomAttribute(__spreadArray([], WuXing, true), _this.wuXingAttri, true).sort(Equipment.sortFunc);
            Equipment.randomAttribute(__spreadArray([], Second, true), _this.secondAttri, true).sort(Equipment.sortFunc);
            Equipment.randomAttribute(__spreadArray([], Body, true), _this.bodyAttri, true).sort(Equipment.sortFunc);
        }
        return _this;
    }
    Equipment.randomAttribute = function (source, attri, randomLen) {
        attri.length = 0;
        if (source.length) {
            var attriCount = randomLen ? MathUtil_1.MathUtil.RandomInt(1, source.length) : source.length;
            while (attriCount > 0) {
                attri.push.apply(attri, source.splice(MathUtil_1.MathUtil.RandomInt(0, source.length - 1), 1));
                attriCount--;
            }
        }
        return attri;
    };
    Equipment.sortFunc = function (a, b) { return a > b ? 1 : -1; };
    return Equipment;
}(ItemBase));
exports.Equipment = Equipment;
