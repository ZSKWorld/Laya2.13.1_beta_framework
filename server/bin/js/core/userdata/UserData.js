"use strict";
exports.__esModule = true;
exports.UserData = void 0;
var GameUtil_1 = require("../../utils/GameUtil");
var MathUtil_1 = require("../../utils/MathUtil");
var TimeUtil_1 = require("../../utils/TimeUtil");
var Util_1 = require("../../utils/Util");
var TableManager_1 = require("../table/TableManager");
var DataConst_1 = require("./DataConst");
var ProxyMgr_1 = require("./ProxyMgr");
var UserData = /** @class */ (function () {
    //#endregion
    //#endregion
    function UserData(account, password, nickname) {
        //#region Properties
        //#region BaseData
        this.uid = Util_1.Util.CreateUID();
        this.nickname = "";
        this.account = "";
        this.password = "";
        this.registerTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.lastLoginTime = 0;
        this.lastOnlineTime = 0;
        /** 离线数据 */
        this.offline = null;
        /** 金币 */
        this.coin = 0;
        /** 元宝 */
        this.vcoin = 0;
        /** 精力 */
        this.vigor = 0;
        /** 境界 */
        this.jingJie = 1;
        /** 层数 */
        this.cengJi = 1;
        /** 经验 */
        this.exp = 0;
        /** 魔核 */
        this.moHe = 0;
        /** 魔币 */
        this.moBi = 0;
        /** 灵石 */
        this.spiritStones = 0;
        /** 称号id */
        this.title = 0;
        /** 帮会id */
        this.society = 0;
        /** 门派id */
        this.sect = 0;
        /** 魂魄 */
        this.soul = 0;
        /** 宝石积分 */
        this.gemScore = 0;
        /** 武器 */
        this.weapon = null;
        /** 头盔 */
        this.helmet = null;
        /** 项链 */
        this.necklace = null;
        /** 衣服 */
        this.clothes = null;
        /** 戒指 */
        this.ring = null;
        /** 裤子 */
        this.trousers = null;
        /** 护符 */
        this.amulet = null;
        /** 鞋子 */
        this.shoes = null;
        /** 坐骑 */
        this.mount = null;
        /** 暗器 */
        this.hiddenWeeapon = null;
        /** 时装 */
        this.fashion = null;
        /** 法宝 */
        this.magicWeapon = null;
        /** 武器上装备的宝石 */
        this.weaponGems = [];
        /** 头盔上装备的宝石 */
        this.helmetGems = [];
        /** 项链上装备的宝石 */
        this.necklaceGems = [];
        /** 衣服上装备的宝石 */
        this.clothesGems = [];
        /** 戒指上装备的宝石 */
        this.ringGems = [];
        /** 裤子上装备的宝石 */
        this.trousersGems = [];
        /** 护符上装备的宝石 */
        this.amuletGems = [];
        /** 鞋子上装备的宝石 */
        this.shoesGems = [];
        /**关卡数据 */
        this.level = {};
        /**副本数据 */
        this.copy = {};
        /**秘境数据 */
        this.secret = {};
        /**boss数据 */
        this.boss = {};
        /**心法数据 */
        this.citta = {};
        /**技能数据 */
        this.skill = [5000];
        /**出战技能 */
        this.usingSkill = [5000, 5000, 5000, 5000, 5000];
        //#endregion
        //#region BagData
        this.collect = [];
        this.equipment = [];
        this.gem = [];
        this.prop = [];
        this.material = [];
        this.book = [];
        this.other = [];
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
        this.vigor = this.getMaxVigro();
    }
    //#region BaseData
    UserData.prototype.decode = function (source) {
        var _this = this;
        Object.keys(source).forEach(function (v) { return _this[v] = source[v]; });
        return this;
    };
    UserData.prototype.login = function (source) {
        var equipments = source[DataConst_1.EquipmentsSign];
        delete source[DataConst_1.EquipmentsSign];
        this.decode(source);
        var bagEquips = this.equipment;
        equipments && equipments.forEach(function (v) {
            var index = 0;
            bagEquips.push({
                id: v[index++],
                count: v[index++],
                uid: v[index++],
                star: v[index++],
                level: v[index++],
                mingKe: v[index++],
                shenYou: v[index++],
                mainAttri: JSON.parse(v[index++]),
                wuXingAttri: JSON.parse(v[index++]),
                secondAttri: JSON.parse(v[index++]),
                bodyAttri: JSON.parse(v[index++])
            });
        });
        this.lastLoginTime = TimeUtil_1.TimeUtil.getTimeStamp();
    };
    /** 获取离线数据 */
    UserData.prototype.getOffline = function () {
        var data = this;
        if (!data.lastOnlineTime)
            return null;
        var timeOffset = ((TimeUtil_1.TimeUtil.getTimeStamp() - data.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5)
            return null;
        else
            return { offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate() * timeOffset) << 0 };
    };
    UserData.prototype.save = function () {
        if (this.equipment.length) {
            var equipments_1 = this[DataConst_1.EquipmentsSign] = [];
            this.equipment.forEach(function (equip) {
                equipments_1.push([
                    equip.id,
                    equip.count,
                    equip.uid,
                    equip.star,
                    equip.level,
                    equip.mingKe,
                    equip.shenYou,
                    JSON.stringify(equip.mainAttri),
                    JSON.stringify(equip.wuXingAttri),
                    JSON.stringify(equip.secondAttri),
                    JSON.stringify(equip.bodyAttri),
                ]);
            });
            this.equipment.length = 0;
        }
        Util_1.Util.saveData(this);
    };
    UserData.prototype.logout = function () {
        this.offline = null;
        this.lastOnlineTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.save();
    };
    /** 获取当前境界最大精力 */
    UserData.prototype.getMaxVigro = function () {
        var citta = this.citta;
        var xinFaJL = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJL += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLAdd); });
        return Math.floor(86400 + xinFaJL);
    };
    /** 获取精力恢复速率 */
    UserData.prototype.getVigorRecoveryRate = function () {
        var citta = this.citta;
        var xinFaJLHF = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJLHF += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLHFAdd); });
        return 1 + xinFaJLHF;
    };
    /** 改变物品数量 */
    UserData.prototype.changeItemCount = function (id, count) {
        var item = TableManager_1.tableMgr.Item[id];
        switch (item.DataType) {
            case 1 /* DataType.BaseData */:
                this[DataConst_1.BaseDataKeyMap[id]] = Math.max(this[DataConst_1.BaseDataKeyMap[id]] + count, 0);
                break;
            case 2 /* DataType.BagData */:
                var datas = void 0;
                var dataKey = void 0;
                switch (item.BagType) {
                    // case ItemBagType.Collect: break;
                    // case ItemBagType.Equip: break;
                    case 2 /* ItemBagType.Prop */:
                        datas = this.prop;
                        dataKey = DataConst_1.UserKeyMap.prop;
                        break;
                    case 3 /* ItemBagType.Gem */:
                        datas = this.gem;
                        dataKey = DataConst_1.UserKeyMap.gem;
                        break;
                    case 4 /* ItemBagType.Material */:
                        datas = this.material;
                        dataKey = DataConst_1.UserKeyMap.material;
                        break;
                    case 5 /* ItemBagType.Book */:
                        datas = this.book;
                        dataKey = DataConst_1.UserKeyMap.book;
                        break;
                    case 6 /* ItemBagType.Other */:
                        datas = this.other;
                        dataKey = DataConst_1.UserKeyMap.other;
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
                    datas.push(ProxyMgr_1.ProxyMgr.createItem(this.uid, dataKey, id, count));
                break;
            default: break;
        }
    };
    /** 获取物品数量 */
    UserData.prototype.getItemCount = function (id) {
        var _a;
        switch (TableManager_1.tableMgr.Item[id].DataType) {
            case 1 /* DataType.BaseData */: return this[DataConst_1.BaseDataKeyMap[id]];
            case 2 /* DataType.BagData */: return ((_a = this.getItem(id)) === null || _a === void 0 ? void 0 : _a.count) || 0;
            default: return 0;
        }
    };
    /** 获取已穿戴装备 */
    UserData.prototype.getDressedEquip = function (part) {
        var key = DataConst_1.DressedEquipMap[part];
        if (key)
            return this[key];
        else
            return null;
    };
    /** 设置穿戴装备 */
    UserData.prototype.setDressedEquip = function (part, equip) {
        var key = DataConst_1.DressedEquipMap[part];
        key && (this[key] = equip);
    };
    //#region 各种检查
    /** 检查当前境界是否满足物品境界需求 */
    UserData.prototype.checkJingJieEnough = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        if (!item)
            return false;
        var _a = item.UseRequire, checkedJingJie = _a.jingJie, checkedCengJi = _a.cengJi;
        var _b = this, jingJie = _b.jingJie, cengJi = _b.cengJi;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    };
    /** 检查是否可以使用物品 */
    UserData.prototype.checkUseItem = function (id, count) {
        if (count <= 0)
            return 1012 /* ErrorCode.NUMBER_ERROR */;
        var item = this.getItem(id);
        if (item == null)
            return 1015 /* ErrorCode.ITEM_NOT_EXIST */;
        var typeItem = GameUtil_1.GameUtil.canUseItem(id);
        if (!typeItem)
            return 1022 /* ErrorCode.ITEM_CAN_NOT_USE */;
        else if (item.count < count)
            return 1016 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        else if (this.checkJingJieEnough(id) == false)
            return 1013 /* ErrorCode.JINGJIE_NOT_ENOUGH_USE */;
        else if (GameUtil_1.GameUtil.isFood(id)) {
            if (this.vigor >= this.getMaxVigro())
                return 1010 /* ErrorCode.VIGOR_IS_FULL */;
        }
        else if (GameUtil_1.GameUtil.isSkillBook(id)) {
            var SectRequire = typeItem.SectRequire;
            if (SectRequire.length && SectRequire.indexOf(this.sect) == -1)
                return 1018 /* ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL */;
            else if (this.skill.indexOf(id) != -1)
                return 1019 /* ErrorCode.SKILL_IS_LEARNED */;
        }
        else if (GameUtil_1.GameUtil.isXinFaBook(id)) {
            if (this.citta[id] != null)
                return 1020 /* ErrorCode.CITTA_IS_LEARNED */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售物品 */
    UserData.prototype.checkSellItem = function (id, count) {
        if (count <= 0)
            return 1012 /* ErrorCode.NUMBER_ERROR */;
        if (!TableManager_1.tableMgr.Item[id].Salable)
            return 1021 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        var item = this.getItem(id);
        if (item == null)
            return 1015 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (item.count < count)
            return 1016 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以穿戴装备 */
    UserData.prototype.checkDressEquip = function (uid) {
        var equip = this.getEquip(uid);
        if (equip == null)
            return 1015 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (this.checkJingJieEnough(equip.id) == false)
            return 1014 /* ErrorCode.JINGJIE_NOT_ENOUGH_DRESS */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以脱下装备 */
    UserData.prototype.checkTakeOffEquip = function (part) {
        if (this.getDressedEquip(part) == null)
            return 1017 /* ErrorCode.PART_NOT_DRESSED_EQUIP */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售装备 */
    UserData.prototype.checkSellEquip = function (uid) {
        var equip = this.getEquip(uid);
        if (!equip)
            return 1015 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (!TableManager_1.tableMgr.Item[equip.id].Salable)
            return 1021 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查物品收藏 */
    UserData.prototype.checkCollect = function (id, collect) {
        if (GameUtil_1.GameUtil.isEquip(id))
            return 1024 /* ErrorCode.EQUIP_CAN_NOT_COLLECT */;
        if (collect && this.isCollect(id))
            return 1025 /* ErrorCode.ITEM_ALREADY_COLLECTED */;
        if (!collect && !this.isCollect(id))
            return 1026 /* ErrorCode.ITEM_DOES_NOT_COLLECT */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以购买物品 */
    UserData.prototype.checkBuyItem = function (id, count) {
        if (count <= 0)
            return 1012 /* ErrorCode.NUMBER_ERROR */;
        var item = TableManager_1.tableMgr.Shop[id];
        if (!item)
            return 1023 /* ErrorCode.GOODS_NOT_EXIST */;
        for (var i = 0, n = item.SellPrice.length; i < n; i++) {
            var element = item.SellPrice[i];
            if (this.getItemCount(element.id) < element.count * count)
                return 1016 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    //#endregion
    /** 使用物品 */
    UserData.prototype.useItem = function (id, count) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var _a = [
            TableManager_1.tableMgr.Props[id], TableManager_1.tableMgr.Food[id], TableManager_1.tableMgr.SkillBook[id], TableManager_1.tableMgr.XinFaBook[id],
        ], prop = _a[0], food = _a[1], skillBook = _a[2], xinFaBook = _a[3];
        if (prop)
            this.useProp(id, count);
        else if (food)
            this.useFood(id, count);
        else if (skillBook)
            this.useSkillBook(id, count);
        else if (xinFaBook)
            this.useCittaBook(id, count);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 出售物品 */
    UserData.prototype.sellItem = function (id, count) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        this._sellItem(id, count);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 穿戴装备 */
    UserData.prototype.dressEquip = function (uid) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var userdata = this;
        var equip = this.getEquip(uid);
        var part = TableManager_1.tableMgr.Equipment[equip.id].Part;
        userdata.equipment.remove(equip);
        var dressedEquip = this.getDressedEquip(part);
        if (dressedEquip)
            userdata.equipment.push(dressedEquip);
        this.setDressedEquip(part, equip);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 脱下装备 */
    UserData.prototype.takeOffEquip = function (part) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var userdata = this;
        var equip = this.getDressedEquip(part);
        this.setDressedEquip(part, null);
        userdata.equipment.push(equip);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 出售装备 */
    UserData.prototype.sellEquip = function (uid) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var equip = this.getEquip(uid);
        this._sellItem(equip.id, 1);
        this.removeEquip(uid);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 分解装备 */
    UserData.prototype.decomposeEquip = function (star) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var equips = this.equipment;
        var equipCnt = equips.length;
        for (var i = equipCnt - 1; i >= 0; i--) {
            if (equips[i].star == star) {
                this._sellItem(equips[i].id, 1);
                equips.splice(i, 1);
            }
        }
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 购买物品 */
    UserData.prototype.buyGoods = function (id, count) {
        var _this = this;
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        var item = TableManager_1.tableMgr.Shop[id];
        item.SellPrice.forEach(function (v) { return _this.changeItemCount(v.id, -v.count); });
        if (GameUtil_1.GameUtil.isEquip(item.SellID))
            this.addNewEquip(item.SellID, count);
        else
            this.changeItemCount(item.SellID, count);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 添加/取消 收藏 */
    UserData.prototype.changeCollect = function (id, collect) {
        ProxyMgr_1.ProxyMgr.clearSyncInfo(this.uid);
        if (collect)
            this.collect.push(id);
        else
            this.collect.remove(id);
        return ProxyMgr_1.ProxyMgr.getSyncInfo(this);
    };
    /** 使用道具 */
    UserData.prototype.useProp = function (id, count) {
        var _this = this;
        var userdata = this;
        var useCount = 1;
        switch (id) {
            case 2007:
                userdata.copy = {};
                break;
            case 2008:
                userdata.secret = {};
                break;
            case 2009:
                userdata.boss = {};
                break;
            case 2010: break;
            default:
                useCount = count;
                TableManager_1.tableMgr.Props[id].Rewards.forEach(function (v) {
                    if (GameUtil_1.GameUtil.isEquip(v.id))
                        _this.addNewEquip(v.id, v.count * count);
                    else
                        _this.changeItemCount(v.id, v.count * count);
                });
                break;
        }
        this.changeItemCount(id, -useCount);
    };
    /** 使用食物 */
    UserData.prototype.useFood = function (id, count) {
        var userdata = this;
        var maxVigro = this.getMaxVigro();
        var useCount = 0;
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
    };
    /** 使用技能书 */
    UserData.prototype.useSkillBook = function (id, count) {
        var userData = this;
        this.changeItemCount(id, -1);
        userData.skill.push(id);
    };
    /** 使用心法书 */
    UserData.prototype.useCittaBook = function (id, count) {
        var userData = this;
        this.changeItemCount(id, -1);
        userData.citta[id] = 1;
    };
    UserData.prototype._sellItem = function (id, count) {
        var _this = this;
        var sellRewards = TableManager_1.tableMgr.Item[id].SellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(function (v) {
                if (GameUtil_1.GameUtil.isEquip(v.id))
                    _this.addNewEquip(v.id, v.count * count);
                else {
                    _this.changeItemCount(v.id, v.count * count);
                }
            });
        }
        this.changeItemCount(id, -count);
    };
    //#endregion
    //#region BagData
    UserData.prototype.isCollect = function (id) { return this.collect.includes(id); };
    /** 获取背包物品 */
    UserData.prototype.getItem = function (id) {
        var item = TableManager_1.tableMgr.Item[id];
        if (!item)
            return null;
        var datas;
        switch (item.BagType) {
            // case ItemBagType.Collect: break;
            // case ItemBagType.Equip: break;
            case 2 /* ItemBagType.Prop */:
                datas = this.prop;
                break;
            case 3 /* ItemBagType.Gem */:
                datas = this.gem;
                break;
            case 4 /* ItemBagType.Material */:
                datas = this.material;
                break;
            case 5 /* ItemBagType.Book */:
                datas = this.book;
                break;
            case 6 /* ItemBagType.Other */:
                datas = this.other;
                break;
        }
        if (datas)
            return datas.find(function (v) { return v.id == id; });
        else
            return null;
    };
    /** 获取背包里的装备 */
    UserData.prototype.getEquip = function (uid) {
        return this.equipment.find(function (v) { return v.uid == uid; });
    };
    /** 添加装备 */
    UserData.prototype.addNewEquip = function (id, count) {
        for (var i = 0; i < count; i++) {
            var equip = ProxyMgr_1.ProxyMgr.createEquipment(this.uid, DataConst_1.UserKeyMap.equipment, id);
            this.equipment.push(equip);
        }
    };
    /** 移除装备 */
    UserData.prototype.removeEquip = function (uid) {
        var equips = this.equipment;
        var equipCount = equips.length;
        for (var i = 0; i < equipCount; i++) {
            if (equips[i].uid == uid) {
                equips.splice(i, 1);
                break;
            }
        }
    };
    return UserData;
}());
exports.UserData = UserData;
