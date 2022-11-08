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
exports.UserDataProxy = void 0;
var GameUtil_1 = require("../../../utils/GameUtil");
var MathUtil_1 = require("../../../utils/MathUtil");
var TimeUtil_1 = require("../../../utils/TimeUtil");
var Util_1 = require("../../../utils/Util");
var TableManager_1 = require("../../table/TableManager");
var DataConst_1 = require("../DataConst");
var UserData_1 = require("../UserData");
var BagProxy_1 = require("./BagProxy");
var ProxyBase_1 = require("./ProxyBase");
var UserDataProxy = /** @class */ (function (_super) {
    __extends(UserDataProxy, _super);
    function UserDataProxy(account, password, nickname) {
        if (account === void 0) { account = ""; }
        if (password === void 0) { password = ""; }
        if (nickname === void 0) { nickname = ""; }
        var _this = _super.call(this, new UserData_1.UserData()) || this;
        var userdata = _this.data;
        userdata.account = String(account);
        userdata.password = String(password);
        userdata.nickname = String(nickname);
        userdata.vigor = _this.getMaxVigro();
        return _this;
    }
    Object.defineProperty(UserDataProxy.prototype, "bag", {
        get: function () { return this._bag; },
        enumerable: false,
        configurable: true
    });
    UserDataProxy.prototype.getUid = function () {
        return this.data.uid;
    };
    UserDataProxy.prototype.getJSONData = function () {
        return JSON.stringify(this.data);
    };
    UserDataProxy.prototype.login = function (source) {
        var data = this.data;
        Object.keys(source).forEach(function (v) { return data[v] = source[v]; });
        data.offline = this.initOffline();
        data.lastLoginTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this._bag = new BagProxy_1.BagProxy(data.bag);
    };
    UserDataProxy.prototype.logout = function () {
        var data = this.data;
        data.offline = null;
        data.lastOnlineTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.save();
    };
    UserDataProxy.prototype.save = function () {
        Util_1.Util.saveData(this.data);
    };
    /** 改变物品数量 */
    UserDataProxy.prototype.changeItemCount = function (id, count) {
        var item = TableManager_1.tableMgr.Item[id];
        switch (item.DataType) {
            case 1 /* DataType.BaseData */:
                this.data[DataConst_1.BaseDataKeyMap[id]] = Math.max(this.data[DataConst_1.BaseDataKeyMap[id]] + count, 0);
                break;
            case 2 /* DataType.BagData */:
                this._bag.changeItemCount(id, count);
                break;
            default: break;
        }
    };
    /** 获取物品数量 */
    UserDataProxy.prototype.getItemCount = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        switch (item.DataType) {
            case 1 /* DataType.BaseData */: return this.data[DataConst_1.BaseDataKeyMap[id]];
            case 2 /* DataType.BagData */: return this.bag.getItemCount(id);
            default: return 0;
        }
    };
    //#region 各种检查
    /** 检查当前境界是否满足物品境界需求 */
    UserDataProxy.prototype.checkJingJieEnough = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        if (!item)
            return false;
        var _a = item.UseRequire, checkedJingJie = _a.jingJie, checkedCengJi = _a.cengJi;
        var _b = this.data, jingJie = _b.jingJie, cengJi = _b.cengJi;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    };
    /** 检查是否可以使用物品 */
    UserDataProxy.prototype.checkUseItem = function (id, count) {
        if (count <= 0)
            return 1011 /* ErrorCode.NUMBER_ERROR */;
        var item = this._bag.getItem(id);
        if (item == null)
            return 1014 /* ErrorCode.ITEM_NOT_EXIST */;
        var typeItem = GameUtil_1.GameUtil.canUseItem(id);
        if (!typeItem)
            return 1021 /* ErrorCode.ITEM_CAN_NOT_USE */;
        else if (item.count < count)
            return 1015 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        else if (this.checkJingJieEnough(id) == false)
            return 1012 /* ErrorCode.JINGJIE_NOT_ENOUGH_USE */;
        else if (GameUtil_1.GameUtil.isSkillBook(id)) {
            var SectRequire = typeItem.SectRequire;
            if (SectRequire.length && SectRequire.indexOf(this.data.sect) == -1)
                return 1017 /* ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL */;
            else if (this.data.skill.indexOf(id) != -1)
                return 1018 /* ErrorCode.SKILL_IS_LEARNED */;
        }
        else if (GameUtil_1.GameUtil.isXinFaBook(id)) {
            if (this.data.citta[id] != null)
                return 1019 /* ErrorCode.CITTA_IS_LEARNED */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售物品 */
    UserDataProxy.prototype.checkSellItem = function (id, count) {
        if (count <= 0)
            return 1011 /* ErrorCode.NUMBER_ERROR */;
        if (!TableManager_1.tableMgr.Item[id].Salable)
            return 1020 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        var item = this._bag.getItem(id);
        if (item == null)
            return 1014 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (item.count < count)
            return 1015 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以穿戴装备 */
    UserDataProxy.prototype.checkDressEquip = function (uid) {
        var equip = this._bag.getEquip(uid);
        if (equip == null)
            return 1014 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (this.checkJingJieEnough(equip.id) == false)
            return 1013 /* ErrorCode.JINGJIE_NOT_ENOUGH_DRESS */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以脱下装备 */
    UserDataProxy.prototype.checkTakeOffEquip = function (part) {
        var equip = this.data[DataConst_1.DressedEquipMap[part]];
        if (equip == null)
            return 1016 /* ErrorCode.PART_NOT_DRESSED_EQUIP */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售装备 */
    UserDataProxy.prototype.checkSellEquip = function (uid) {
        var equip = this._bag.getEquip(uid);
        if (equip)
            return 1014 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (!TableManager_1.tableMgr.Item[equip.id].Salable)
            return 1020 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查物品收藏 */
    UserDataProxy.prototype.checkCollect = function (id, collect) {
        if (this.isEquip(id))
            return 1023 /* ErrorCode.EQUIP_CAN_NOT_COLLECT */;
        if (collect && this._bag.isCollect(id))
            return 1024 /* ErrorCode.ITEM_ALREADY_COLLECTED */;
        if (!collect && !this._bag.isCollect(id))
            return 1025 /* ErrorCode.ITEM_DOES_NOT_COLLECT */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以购买物品 */
    UserDataProxy.prototype.checkBuyItem = function (id, count) {
        if (count <= 0)
            return 1011 /* ErrorCode.NUMBER_ERROR */;
        var item = TableManager_1.tableMgr.Shop[id];
        if (!item)
            return 1022 /* ErrorCode.GOODS_NOT_EXIST */;
        var userData = this.data;
        for (var i = 0, n = item.SellPrice.length; i < n; i++) {
            var element = item.SellPrice[i];
            if (this.getItemCount(element.id) < element.count * count)
                return 1015 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    //#endregion
    /** 获取对应境界最大精力 */
    UserDataProxy.prototype.getMaxVigro = function () {
        var citta = this.data.citta;
        var xinFaJL = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJL += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLAdd); });
        return Math.floor(86400 + xinFaJL);
    };
    /** 获取精力恢复速率 */
    UserDataProxy.prototype.getVigorRecoveryRate = function () {
        var citta = this.data.citta;
        var xinFaJLHF = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJLHF += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLHFAdd); });
        return 1 + xinFaJLHF;
    };
    /** 使用物品 */
    UserDataProxy.prototype.useItem = function (id, count) {
        var _a = [
            TableManager_1.tableMgr.Props[id], TableManager_1.tableMgr.Food[id], TableManager_1.tableMgr.SkillBook[id], TableManager_1.tableMgr.XinFaBook[id],
        ], prop = _a[0], food = _a[1], skillBook = _a[2], xinFaBook = _a[3];
        if (prop)
            return this.useProp(id, count);
        else if (food)
            return this.useFood(id, count);
        else if (skillBook)
            return this.useSkillBook(id, count);
        else if (xinFaBook)
            return this.useCittaBook(id, count);
        else
            return {};
    };
    /** 出售物品 */
    UserDataProxy.prototype.sellItem = function (id, count) {
        var _this = this;
        var sellRewards = TableManager_1.tableMgr.Item[id].SellRewards;
        var syncInfo = {};
        if (sellRewards.length) {
            sellRewards.forEach(function (v) {
                if (_this.isEquip(v.id))
                    _this._bag.addNewEquip(v.id, v.count * count);
                else {
                    _this.changeItemCount(v.id, v.count * count);
                    if (TableManager_1.tableMgr.Item[v.id].DataType == 1 /* DataType.BaseData */)
                        syncInfo[DataConst_1.BaseDataKeyMap[v.id]] = _this.data[DataConst_1.BaseDataKeyMap[v.id]];
                }
            });
            syncInfo["bag"] = this.data.bag;
        }
        this.changeItemCount(id, -count);
        return syncInfo;
    };
    /** 穿戴装备 */
    UserDataProxy.prototype.dressEquip = function (uid) {
        var userdata = this.data;
        var equip = this._bag.getEquip(uid);
        var part = TableManager_1.tableMgr.Equipment[equip.id].Part;
        var keyWord = DataConst_1.DressedEquipMap[part];
        userdata.bag.equipment.remove(equip);
        var dressedEquip = userdata[keyWord];
        if (dressedEquip)
            userdata.bag.equipment.push(dressedEquip);
        userdata[keyWord] = equip;
        var syncInfo = { bag: userdata.bag };
        syncInfo[keyWord] = userdata[keyWord];
        return syncInfo;
    };
    /** 脱下装备 */
    UserDataProxy.prototype.takeOffEquip = function (part) {
        var userdata = this.data;
        var keyWord = DataConst_1.DressedEquipMap[part];
        var equip = userdata[keyWord];
        userdata[keyWord] = null;
        userdata.bag.equipment.push(equip);
        var syncInfo = { bag: userdata.bag };
        syncInfo[keyWord] = userdata[keyWord];
        return syncInfo;
    };
    UserDataProxy.prototype.sellEquip = function (uid) {
        var equip = this._bag.getEquip(uid);
        var syncInfo = this.sellItem(equip.id, 1);
        this._bag.removeEquip(uid);
        return syncInfo;
    };
    UserDataProxy.prototype.buyGoods = function (id, count) {
        var _this = this;
        var syncInfo = {};
        var item = TableManager_1.tableMgr.Shop[id];
        item.SellPrice.forEach(function (v) {
            _this.changeItemCount(v.id, -v.count);
            var dataType = TableManager_1.tableMgr.Item[v.id].DataType;
            if (dataType == 1 /* DataType.BaseData */)
                syncInfo[DataConst_1.BaseDataKeyMap[v.id]] = _this.getItemCount(v.id);
            else if (dataType == 2 /* DataType.BagData */)
                syncInfo["bag"] = _this.data.bag;
        });
        if (GameUtil_1.GameUtil.isEquip(item.SellID))
            this.bag.addNewEquip(item.SellID, count);
        else
            this.changeItemCount(item.SellID, count);
        var dataType = TableManager_1.tableMgr.Item[item.SellID].DataType;
        if (dataType == 1 /* DataType.BaseData */)
            syncInfo[DataConst_1.BaseDataKeyMap[item.SellID]] = this.getItemCount(item.SellID);
        else if (dataType == 2 /* DataType.BagData */)
            syncInfo["bag"] = this.data.bag;
        return syncInfo;
    };
    UserDataProxy.prototype.changeCollect = function (id, collect) {
        this.bag.changeCollect(id, collect);
        return { bag: this.data.bag };
    };
    /** 使用道具 */
    UserDataProxy.prototype.useProp = function (id, count) {
        var _this = this;
        var userdata = this.data;
        var syncInfo = {};
        var useCount = 1;
        switch (id) {
            case 2007:
                userdata.copy = {};
                syncInfo["copy"] = userdata.copy;
                break;
            case 2008:
                userdata.secret = {};
                syncInfo["secret"] = userdata.secret;
                break;
            case 2009:
                userdata.boss = {};
                syncInfo["boss"] = userdata.boss;
                break;
            case 2010: break;
            default:
                useCount = count;
                TableManager_1.tableMgr.Props[id].Rewards.forEach(function (v) {
                    if (_this.isEquip(v.id))
                        _this._bag.addNewEquip(v.id, v.count);
                    else {
                        _this.changeItemCount(v.id, v.count * count);
                        if (TableManager_1.tableMgr.Item[v.id].DataType == 1 /* DataType.BaseData */)
                            syncInfo[DataConst_1.BaseDataKeyMap[v.id]] = _this.data[DataConst_1.BaseDataKeyMap[v.id]];
                    }
                });
                break;
        }
        syncInfo["bag"] = userdata.bag;
        this.changeItemCount(id, -useCount);
        return syncInfo;
    };
    /** 使用食物 */
    UserDataProxy.prototype.useFood = function (id, count) {
        var userdata = this.data;
        var maxVigro = this.getMaxVigro();
        var syncInfo = {};
        var useCount = 0;
        if (userdata.vigor < maxVigro) {
            var food = TableManager_1.tableMgr.Food[id];
            var singleRecover = 0;
            switch (food.RecoverType) {
                case 1 /* FoodRecoverType.NumberRecover */:
                    singleRecover = food.RecoverValue;
                    break;
                case 2 /* FoodRecoverType.TimeRecover */:
                    singleRecover = food.RecoverValue * this.getVigorRecoveryRate();
                    break;
                case 3 /* FoodRecoverType.PercentRecover */:
                    singleRecover = food.RecoverValue * maxVigro;
                    break;
                default: return 1014 /* LangCode._1014 */;
            }
            var subVigro = maxVigro - userdata.vigor;
            if (subVigro <= singleRecover)
                useCount = 1;
            else if (subVigro % singleRecover == 0)
                useCount = Math.min(subVigro / singleRecover, count);
            else
                useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
            userdata.vigor = MathUtil_1.MathUtil.Clamp(userdata.vigor + singleRecover * useCount, 0, maxVigro);
            this.changeItemCount(id, -useCount);
            syncInfo["bag"] = userdata.bag;
            syncInfo["vigor"] = userdata.vigor;
        }
        return syncInfo;
    };
    /** 使用技能书 */
    UserDataProxy.prototype.useSkillBook = function (id, count) {
        var userData = this.data;
        this.changeItemCount(id, -1);
        userData.skill.push(id);
        var syncInfo = { skill: userData.skill, bag: userData.bag };
        return syncInfo;
    };
    /** 使用心法书 */
    UserDataProxy.prototype.useCittaBook = function (id, count) {
        var userData = this.data;
        this.changeItemCount(id, -1);
        userData.citta[id] = 1;
        var syncInfo = { citta: userData.citta, bag: userData.bag };
        return syncInfo;
    };
    /** 初始化离线数据 */
    UserDataProxy.prototype.initOffline = function () {
        var data = this.data;
        if (!data.lastOnlineTime)
            return null;
        var timeOffset = ((TimeUtil_1.TimeUtil.getTimeStamp() - data.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5)
            return null;
        else
            return { offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate() * timeOffset) << 0 };
    };
    UserDataProxy.prototype.isEquip = function (id) {
        return !!TableManager_1.tableMgr.Equipment[id];
    };
    return UserDataProxy;
}(ProxyBase_1.ProxyBase));
exports.UserDataProxy = UserDataProxy;
