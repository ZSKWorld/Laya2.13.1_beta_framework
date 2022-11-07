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
exports.BagProxy = void 0;
var TableManager_1 = require("../../table/TableManager");
var Equipment_1 = require("../Equipment");
var ProxyBase_1 = require("./ProxyBase");
var BagProxy = /** @class */ (function (_super) {
    __extends(BagProxy, _super);
    function BagProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 获取背包物品 */
    BagProxy.prototype.getItem = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        if (!item)
            return null;
        var bag = this.data;
        var datas;
        switch (item.BagType) {
            // case ItemBagType.ShouCang: break;
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
            case 5 /* ItemBagType.SkillBook */:
                datas = bag.skillBook;
                break;
            case 6 /* ItemBagType.Other */:
                datas = bag.other;
                break;
        }
        if (datas)
            return datas.find(function (v) { return v.id = id; });
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
            // case ItemBagType.ShouCang: break;
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
            case 5 /* ItemBagType.SkillBook */:
                datas = bag.skillBook;
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
                break;
            }
        }
    };
    /** 添加装备 */
    BagProxy.prototype.addNewEquip = function (id, count) {
        for (var i = 0; i < count; i++) {
            this.data.equipment.push(new Equipment_1.Equipment(id));
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
