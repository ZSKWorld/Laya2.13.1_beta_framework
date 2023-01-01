"use strict";
exports.__esModule = true;
exports.UserData = void 0;
var GameUtil_1 = require("../../utils/GameUtil");
var MathUtil_1 = require("../../utils/MathUtil");
var TimeUtil_1 = require("../../utils/TimeUtil");
var Util_1 = require("../../utils/Util");
var TableManager_1 = require("../table/TableManager");
var DataConst_1 = require("./DataConst");
var Formula_1 = require("./Formula");
var Item_1 = require("./Item");
var EncodeData = [
    { name: "$equipments", Class: Item_1.Equipment },
    { name: "$Prop", Class: Item_1.ItemBase },
    { name: "$Gem", Class: Item_1.ItemBase },
    { name: "$Material", Class: Item_1.ItemBase },
    { name: "$Book", Class: Item_1.ItemBase },
    { name: "$Other", Class: Item_1.ItemBase }, //ItemBagType.Other
];
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
        this.friends = [];
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
    //#region 初始化相关
    UserData.prototype.getSyncInfo = function () { };
    UserData.prototype.clearSyncInfo = function () { };
    UserData.prototype.login = function (source) {
        var _this = this;
        var encodeDatas = [];
        EncodeData.forEach(function (v) {
            encodeDatas.push(source[v.name]);
            delete source[v.name];
        });
        Object.keys(source).forEach(function (v) { return _this[v] = source[v]; });
        var _a = this, equipment = _a.equipment, prop = _a.prop, gem = _a.gem, material = _a.material, book = _a.book, other = _a.other;
        var objects = [equipment, prop, gem, material, book, other];
        encodeDatas.forEach(function (typeData, objIndex) {
            if (typeData) {
                var keys_1 = typeData.shift();
                typeData.forEach(function (data) {
                    var item = new EncodeData[objIndex].Class();
                    keys_1.reduce(function (pv, cv, index) { return (pv[cv] = data[index], pv); }, item);
                    objects[objIndex].push(item);
                });
            }
        });
        this.lastLoginTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.offline = this.getOffline();
    };
    /** 获取离线数据 */
    UserData.prototype.getOffline = function () { return GameUtil_1.GameUtil.getOffline(this); };
    UserData.prototype.save = function () {
        var _this = this;
        this.offline = null;
        var encodeKeys = [];
        EncodeData.forEach(function (v) { return encodeKeys.push(v.name); });
        var _a = this, equipment = _a.equipment, prop = _a.prop, gem = _a.gem, material = _a.material, book = _a.book, other = _a.other;
        var objects = [equipment, prop, gem, material, book, other];
        objects.forEach(function (obj, objIndex) {
            if (obj.length) {
                var itemKeys_1 = Object.keys(obj[0]);
                var items_1 = _this[encodeKeys[objIndex]] = [itemKeys_1];
                obj.forEach(function (data) {
                    var result = [];
                    itemKeys_1.forEach(function (key) { return result.push(data[key]); });
                    items_1.push(result);
                });
                obj.length = 0;
            }
        });
        Util_1.Util.saveData(this);
    };
    UserData.prototype.logout = function () {
        this.lastOnlineTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.save();
    };
    //#endregion
    /** 获取当前境界最大精力 */
    UserData.prototype.getMaxVigro = function () {
        var citta = this.citta;
        var xinFaJL = 0;
        Object.keys(citta).forEach(function (v) { return xinFaJL += (citta[v] * TableManager_1.tableMgr.XinFaBook[v].JLAdd); });
        return Math.floor(86400 + xinFaJL);
    };
    /** 获取精力恢复速率 */
    UserData.prototype.getVigorRecoveryRate = function () {
        return GameUtil_1.GameUtil.getVigorRecoveryRate(this);
    };
    /** 改变物品数量 */
    UserData.prototype.changeItemCount = function (id, count) {
        var item = TableManager_1.tableMgr.Item[id];
        switch (item.DataType) {
            case 1 /* DataType.BaseData */:
                switch (id) {
                    case 1001 /* BaseDataType.Coin */:
                        this.coin = Math.max(this.coin + count, 0);
                        break;
                    case 1002 /* BaseDataType.Vcoin */:
                        this.vcoin = Math.max(this.vcoin + count, 0);
                        break;
                    case 1003 /* BaseDataType.Exp */:
                        this.addExp(count);
                        break;
                    case 1004 /* BaseDataType.MoHe */:
                        this.moHe = Math.max(this.moHe + count, 0);
                        break;
                    case 1005 /* BaseDataType.MoBi */:
                        this.moBi = Math.max(this.moBi + count, 0);
                        break;
                    case 1006 /* BaseDataType.SpiritStones */:
                        this.spiritStones = Math.max(this.spiritStones + count, 0);
                        break;
                    case 1007 /* BaseDataType.Soul */:
                        this.soul = Math.max(this.soul + count, 0);
                        break;
                    case 1008 /* BaseDataType.GemScore */:
                        this.gemScore = Math.max(this.gemScore + count, 0);
                        break;
                    case 1009 /* BaseDataType.Vigor */:
                        this.vigor = Math.max(this.vigor + count, 0);
                        break;
                    default: throw new Error("未知基础数据类型" + id);
                }
                break;
            case 2 /* DataType.BagData */:
                var datas = void 0;
                switch (item.BagType) {
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
                    default: throw new Error("未知背包数据类型" + id);
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
                    datas.push(new Item_1.ItemBase(id, count));
                break;
            default: break;
        }
    };
    /** 是否收藏 */
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
    /** 获取物品数量 */
    UserData.prototype.getItemCount = function (id) {
        var _a;
        switch (TableManager_1.tableMgr.Item[id].DataType) {
            case 1 /* DataType.BaseData */:
                switch (id) {
                    case 1001 /* BaseDataType.Coin */: return this.coin;
                    case 1002 /* BaseDataType.Vcoin */: return this.vcoin;
                    case 1003 /* BaseDataType.Exp */: return this.exp;
                    case 1004 /* BaseDataType.MoHe */: return this.moHe;
                    case 1005 /* BaseDataType.MoBi */: return this.moBi;
                    case 1006 /* BaseDataType.SpiritStones */: return this.spiritStones;
                    case 1007 /* BaseDataType.Soul */: return this.soul;
                    case 1008 /* BaseDataType.GemScore */: return this.gemScore;
                    case 1009 /* BaseDataType.Vigor */: return this.vigor;
                    default: throw new Error("未知基础数据类型" + id);
                }
            case 2 /* DataType.BagData */: return ((_a = this.getItem(id)) === null || _a === void 0 ? void 0 : _a.count) || 0;
            default: return 0;
        }
    };
    /** 获取背包里的装备 */
    UserData.prototype.getEquip = function (uid) {
        return this.equipment.find(function (v) { return v.uid == uid; });
    };
    /** 添加装备 */
    UserData.prototype.addNewEquip = function (id, count) {
        for (var i = 0; i < count; i++) {
            var equip = new Item_1.Equipment(id);
            equip.createAttribute();
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
            return 1013 /* ErrorCode.NUMBER_ERROR */;
        var item = this.getItem(id);
        if (item == null)
            return 1016 /* ErrorCode.ITEM_NOT_EXIST */;
        var typeItem = GameUtil_1.GameUtil.canUseItem(id);
        if (!typeItem)
            return 1023 /* ErrorCode.ITEM_CAN_NOT_USE */;
        else if (item.count < count)
            return 1017 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        else if (this.checkJingJieEnough(id) == false)
            return 1014 /* ErrorCode.JINGJIE_NOT_ENOUGH_USE */;
        else if (GameUtil_1.GameUtil.isFood(id)) {
            if (this.vigor >= this.getMaxVigro())
                return 1011 /* ErrorCode.VIGOR_IS_FULL */;
        }
        else if (GameUtil_1.GameUtil.isSkillBook(id)) {
            var SectRequire = typeItem.SectRequire;
            if (SectRequire.length && SectRequire.indexOf(this.sect) == -1)
                return 1019 /* ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL */;
            else if (this.skill.indexOf(id) != -1)
                return 1020 /* ErrorCode.SKILL_IS_LEARNED */;
        }
        else if (GameUtil_1.GameUtil.isXinFaBook(id)) {
            if (this.citta[id] != null)
                return 1021 /* ErrorCode.CITTA_IS_LEARNED */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售物品 */
    UserData.prototype.checkSellItem = function (id, count) {
        if (count <= 0)
            return 1013 /* ErrorCode.NUMBER_ERROR */;
        if (!TableManager_1.tableMgr.Item[id].Salable)
            return 1022 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        var item = this.getItem(id);
        if (item == null)
            return 1016 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (item.count < count)
            return 1017 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以穿戴装备 */
    UserData.prototype.checkDressEquip = function (uid) {
        var equip = this.getEquip(uid);
        if (equip == null)
            return 1016 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (this.checkJingJieEnough(equip.id) == false)
            return 1015 /* ErrorCode.JINGJIE_NOT_ENOUGH_DRESS */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以脱下装备 */
    UserData.prototype.checkTakeOffEquip = function (part) {
        if (this.getDressedEquip(part) == null)
            return 1018 /* ErrorCode.PART_NOT_DRESSED_EQUIP */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以出售装备 */
    UserData.prototype.checkSellEquip = function (uid) {
        var equip = this.getEquip(uid);
        if (!equip)
            return 1016 /* ErrorCode.ITEM_NOT_EXIST */;
        else if (!TableManager_1.tableMgr.Item[equip.id].Salable)
            return 1022 /* ErrorCode.ITEM_CAN_NOT_SELL */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查物品收藏 */
    UserData.prototype.checkCollect = function (id, collect) {
        if (GameUtil_1.GameUtil.isEquip(id))
            return 1025 /* ErrorCode.EQUIP_CAN_NOT_COLLECT */;
        if (collect && this.isCollect(id))
            return 1026 /* ErrorCode.ITEM_ALREADY_COLLECTED */;
        if (!collect && !this.isCollect(id))
            return 1027 /* ErrorCode.ITEM_DOES_NOT_COLLECT */;
        return 0 /* ErrorCode.NONE */;
    };
    /** 检查是否可以购买物品 */
    UserData.prototype.checkBuyItem = function (id, count) {
        if (count <= 0)
            return 1013 /* ErrorCode.NUMBER_ERROR */;
        var item = TableManager_1.tableMgr.Shop[id];
        if (!item)
            return 1024 /* ErrorCode.GOODS_NOT_EXIST */;
        for (var i = 0, n = item.SellPrice.length; i < n; i++) {
            var element = item.SellPrice[i];
            if (this.getItemCount(element.id) < element.count * count)
                return 1017 /* ErrorCode.ITEM_COUNT_NOT_ENOUGH */;
        }
        return 0 /* ErrorCode.NONE */;
    };
    //#endregion
    /** 使用物品 */
    UserData.prototype.useItem = function (id, count) {
        var _a = [
            TableManager_1.tableMgr.Props[id], TableManager_1.tableMgr.Food[id], TableManager_1.tableMgr.SkillBook[id], TableManager_1.tableMgr.XinFaBook[id],
        ], prop = _a[0], food = _a[1], skillBook = _a[2], xinFaBook = _a[3];
        if (prop)
            return this.useProp(id, count);
        else if (food)
            return this.useFood(id, count);
        else if (skillBook) {
            this.changeItemCount(id, -1);
            this.skill.push(id);
            return [new Item_1.ItemBase(skillBook.ID, 1)];
        }
        else if (xinFaBook) {
            this.changeItemCount(id, -1);
            this.citta[id] = 1;
            return [new Item_1.ItemBase(xinFaBook.ID, 1)];
        }
        return [];
    };
    /** 出售物品 */
    UserData.prototype.sellItem = function (id, count) {
        var _this = this;
        var rewards = [];
        var sellRewards = TableManager_1.tableMgr.Item[id].SellRewards;
        if (sellRewards.length) {
            sellRewards.forEach(function (v) {
                rewards.push(new Item_1.ItemBase(v.id, v.count * count));
                if (GameUtil_1.GameUtil.isEquip(v.id))
                    _this.addNewEquip(v.id, v.count * count);
                else {
                    _this.changeItemCount(v.id, v.count * count);
                }
            });
        }
        this.changeItemCount(id, -count);
        return rewards;
    };
    /** 穿戴装备 */
    UserData.prototype.dressEquip = function (uid) {
        var userdata = this;
        var equip = this.getEquip(uid);
        var part = TableManager_1.tableMgr.Equipment[equip.id].Part;
        userdata.equipment.remove(equip);
        var dressedEquip = this.getDressedEquip(part);
        if (dressedEquip)
            userdata.equipment.push(dressedEquip);
        this.setDressedEquip(part, equip);
    };
    /** 脱下装备 */
    UserData.prototype.takeOffEquip = function (part) {
        var userdata = this;
        var equip = this.getDressedEquip(part);
        this.setDressedEquip(part, null);
        userdata.equipment.push(equip);
    };
    /** 出售装备 */
    UserData.prototype.sellEquip = function (uid) {
        var equip = this.getEquip(uid);
        this.removeEquip(uid);
        return this.sellItem(equip.id, 1);
    };
    /** 分解装备 */
    UserData.prototype.decomposeEquip = function (star) {
        var equips = this.equipment;
        var equipCnt = equips.length;
        var rewards = [];
        for (var i = equipCnt - 1; i >= 0; i--) {
            if (equips[i].star == star) {
                rewards = rewards.concat(this.sellItem(equips[i].id, 1));
                equips.splice(i, 1);
            }
        }
        return rewards;
    };
    /** 购买物品 */
    UserData.prototype.buyGoods = function (id, count) {
        var _this = this;
        var item = TableManager_1.tableMgr.Shop[id];
        item.SellPrice.forEach(function (v) { return _this.changeItemCount(v.id, -v.count * count); });
        if (GameUtil_1.GameUtil.isEquip(item.SellID))
            this.addNewEquip(item.SellID, count);
        else
            this.changeItemCount(item.SellID, count);
        var rewards = [new Item_1.ItemBase(item.SellID, count)];
        return rewards;
    };
    /** 添加/取消 收藏 */
    UserData.prototype.changeCollect = function (id, collect) {
        if (collect)
            this.collect.push(id);
        else
            this.collect.remove(id);
    };
    /** 使用道具 */
    UserData.prototype.useProp = function (id, count) {
        var _this = this;
        var userdata = this;
        var rewards = [];
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
                    rewards.push(new Item_1.ItemBase(v.id, v.count * count));
                    if (GameUtil_1.GameUtil.isEquip(v.id))
                        _this.addNewEquip(v.id, v.count * count);
                    else
                        _this.changeItemCount(v.id, v.count * count);
                });
                break;
        }
        this.changeItemCount(id, -useCount);
        return rewards;
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
            default: throw new Error("未知食物类型");
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
        return [new Item_1.ItemBase(1009 /* BaseDataType.Vigor */, subVigro)];
    };
    /**升级经验 ，没有为0*/
    UserData.prototype.getUpgradeExp = function () {
        if (!TableManager_1.tableMgr.JingJie[this.jingJie + 1])
            return 0;
        else
            return Formula_1.Formula.exp(this.jingJie, this.cengJi);
    };
    UserData.prototype.addExp = function (num) {
        var _this = this;
        if (this.getUpgradeExp() == 0)
            return;
        this.exp = Math.max(this.exp + num, 0);
        var addExp2 = function () {
            //升层级
            if (_this.exp >= _this.getUpgradeExp()) {
                _this.exp -= _this.getUpgradeExp();
                _this.cengJi++;
            }
            ;
            var maxCengji = +TableManager_1.tableMgr.Const[1005].Value;
            if (TableManager_1.tableMgr.JingJie[_this.jingJie + 1]) {
                //升境界
                if (_this.cengJi > maxCengji) {
                    _this.cengJi -= maxCengji;
                    _this.jingJie++;
                }
            }
            if (_this.getUpgradeExp() != 0)
                _this.exp >= _this.getUpgradeExp() && addExp2();
            else
                (_this.exp = 0) && (_this.cengJi = 0);
        };
        addExp2();
    };
    return UserData;
}());
exports.UserData = UserData;
