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
exports.BagProxy = void 0;
var MathUtil_1 = require("../../../utils/MathUtil");
var TableManager_1 = require("../../table/TableManager");
var Equipment_1 = require("../Equipment");
var ItemBase_1 = require("../ItemBase");
var ProxyBase_1 = require("./ProxyBase");
var BagProxy = /** @class */ (function (_super) {
    __extends(BagProxy, _super);
    function BagProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BagProxy.prototype.isCollect = function (id) { return this.data.collect.includes(id); };
    BagProxy.prototype.changeCollect = function (id, collect) {
        if (collect)
            this.data.collect.push(id);
        else
            this.data.collect.remove(id);
    };
    /** 获取背包物品 */
    BagProxy.prototype.getItem = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        if (!item)
            return null;
        var bag = this.data;
        var datas;
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case 2 /* ItemBagType.Prop */:
                datas = bag.prop;
                break;
            case 3 /* ItemBagType.Gem */:
                datas = bag.gem;
                break;
            case 4 /* ItemBagType.Material */:
                datas = bag.material;
                break;
            case 5 /* ItemBagType.Book */:
                datas = bag.book;
                break;
            case 6 /* ItemBagType.Other */:
                datas = bag.other;
                break;
        }
        if (datas)
            return datas.find(function (v) { return v.id == id; });
        else
            return null;
    };
    /** 获取背包里的装备 */
    BagProxy.prototype.getEquip = function (uid) {
        return this.data.equipment.find(function (v) { return v.uid == uid; });
    };
    /** 改变背包物品数量 */
    BagProxy.prototype.changeItemCount = function (id, count) {
        var item = TableManager_1.tableMgr.Item[id];
        var bag = this.data;
        var datas;
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case 2 /* ItemBagType.Prop */:
                datas = bag.prop;
                break;
            case 3 /* ItemBagType.Gem */:
                datas = bag.gem;
                break;
            case 4 /* ItemBagType.Material */:
                datas = bag.material;
                break;
            case 5 /* ItemBagType.Book */:
                datas = bag.book;
                break;
            case 6 /* ItemBagType.Other */:
                datas = bag.other;
                break;
            default: return;
        }
        var dataLen = datas.length;
        for (var i = 0; i < dataLen; i++) {
            if (datas[i].id == id) {
                datas[i].count += count;
                if (datas[i].count <= 0)
                    datas.splice(i, 1);
                return;
            }
        }
        if (count > 0)
            datas.push(new ItemBase_1.ItemBase(id, count));
    };
    /** 获取背包物品数量 */
    BagProxy.prototype.getItemCount = function (id) {
        var _a;
        return ((_a = this.getItem(id)) === null || _a === void 0 ? void 0 : _a.count) || 0;
    };
    /** 添加装备 */
    BagProxy.prototype.addNewEquip = function (id, count) {
        var equipInfo = TableManager_1.tableMgr.Equipment[id];
        var _a = TableManager_1.tableMgr.EquipmentAddition[equipInfo.Part], Main = _a.Main, WuXing = _a.WuXing, Second = _a.Second, Body = _a.Body;
        var randomAttri = function (source, attri, randomLen) {
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
        var sortFunc = function (a, b) { return a > b ? 1 : -1; };
        for (var i = 0; i < count; i++) {
            var equip = new Equipment_1.Equipment(id);
            equip.star = MathUtil_1.MathUtil.RandomInt(1, +TableManager_1.tableMgr.Const[1010].Value);
            randomAttri(__spreadArray([], Main, true), equip.mainAttri, false).sort(sortFunc);
            randomAttri(__spreadArray([], WuXing, true), equip.wuXingAttri, true).sort(sortFunc);
            randomAttri(__spreadArray([], Second, true), equip.secondAttri, true).sort(sortFunc);
            randomAttri(__spreadArray([], Body, true), equip.bodyAttri, true).sort(sortFunc);
            this.data.equipment.push(equip);
        }
    };
    /** 移除装备 */
    BagProxy.prototype.removeEquip = function (uid) {
        var equips = this.data.equipment;
        var equipCount = equips.length;
        for (var i = 0; i < equipCount; i++) {
            if (equips[i].uid == uid) {
                equips.splice(i, 1);
                break;
            }
        }
    };
    return BagProxy;
}(ProxyBase_1.ProxyBase));
exports.BagProxy = BagProxy;
