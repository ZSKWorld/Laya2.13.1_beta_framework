"use strict";
exports.__esModule = true;
exports.ProxyMgr = void 0;
var DataConst_1 = require("./DataConst");
var Item_1 = require("./Item");
var UserData_1 = require("./UserData");
var ProxyMgr = /** @class */ (function () {
    function ProxyMgr() {
    }
    ProxyMgr.getProxyHandlerSet = function (uid, dataKey) {
        return function set(target, p, value, receiver) {
            target[p] = value;
            ProxyMgr.proxyMap[uid][dataKey] = true;
            return true;
        };
    };
    ProxyMgr.decodeProxy = function (uid, dataKey, target, source) {
        if (target[this.ProxyKey])
            return target;
        Object.keys(source).forEach(function (key) {
            if (source[key] !== null && typeof source[key] == "object")
                target[key] = new Proxy(source[key], { set: ProxyMgr.getProxyHandlerSet(uid, dataKey) });
            else
                target[key] = source[key];
        });
        var result = new Proxy(target, { set: ProxyMgr.getProxyHandlerSet(uid, dataKey) });
        result[this.ProxyKey] = true;
        return result;
    };
    ProxyMgr.getSyncInfo = function (userData) {
        var keyMap = this.proxyMap[userData.uid];
        var syncInfo = {};
        Object.keys(keyMap).forEach(function (key) { return syncInfo[key] = userData[key]; });
        this.proxyMap[userData.uid] = {};
        return syncInfo;
    };
    ProxyMgr.clearSyncInfo = function (uid) {
        this.proxyMap[uid] = {};
    };
    ProxyMgr.createUserData = function (uid) {
        var _this = this;
        var user = new UserData_1.UserData("", "", "");
        return new Proxy(user, {
            set: function (target, p, value, receiver) {
                switch (p) {
                    case DataConst_1.UserKeyMap.uid: break;
                    case DataConst_1.UserKeyMap.nickname: break;
                    case DataConst_1.UserKeyMap.account: break;
                    case DataConst_1.UserKeyMap.password: break;
                    case DataConst_1.UserKeyMap.registerTime: break;
                    case DataConst_1.UserKeyMap.lastLoginTime: break;
                    case DataConst_1.UserKeyMap.lastOnlineTime: break;
                    case DataConst_1.UserKeyMap.offline: break;
                    case DataConst_1.UserKeyMap.coin: break;
                    case DataConst_1.UserKeyMap.vcoin: break;
                    case DataConst_1.UserKeyMap.vigor: break;
                    case DataConst_1.UserKeyMap.jingJie: break;
                    case DataConst_1.UserKeyMap.cengJi: break;
                    case DataConst_1.UserKeyMap.exp: break;
                    case DataConst_1.UserKeyMap.moHe: break;
                    case DataConst_1.UserKeyMap.moBi: break;
                    case DataConst_1.UserKeyMap.spiritStones: break;
                    case DataConst_1.UserKeyMap.title: break;
                    case DataConst_1.UserKeyMap.society: break;
                    case DataConst_1.UserKeyMap.sect: break;
                    case DataConst_1.UserKeyMap.soul: break;
                    case DataConst_1.UserKeyMap.gemScore: break;
                    case DataConst_1.EquipmentsSign: break;
                    case DataConst_1.UserKeyMap.weapon:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.helmet:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.necklace:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.clothes:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.ring:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.trousers:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.amulet:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.shoes:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.mount:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.hiddenWeeapon:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.fashion:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.magicWeapon:
                        value = _this.createEquipment(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.weaponGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.helmetGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.necklaceGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.clothesGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.ringGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.trousersGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.amuletGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.shoesGems:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.level:
                        value = _this.createObj(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.copy:
                        value = _this.createObj(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.secret:
                        value = _this.createObj(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.boss:
                        value = _this.createObj(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.citta:
                        value = _this.createObj(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.skill:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.usingSkill:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.collect:
                        value = _this.createArray(uid, p, value);
                        break;
                    case DataConst_1.UserKeyMap.equipment:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createEquipment(uid, p, v); }));
                        break;
                    case DataConst_1.UserKeyMap.gem:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createItem(uid, p, v); }));
                        break;
                    case DataConst_1.UserKeyMap.prop:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createItem(uid, p, v); }));
                        break;
                    case DataConst_1.UserKeyMap.material:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createItem(uid, p, v); }));
                        break;
                    case DataConst_1.UserKeyMap.book:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createItem(uid, p, v); }));
                        break;
                    case DataConst_1.UserKeyMap.other:
                        value = _this.createArray(uid, p, value.map(function (v) { return _this.createItem(uid, p, v); }));
                        break;
                    default: throw new Error("unknown key => " + p);
                }
                target[p] = value;
                ProxyMgr.proxyMap[user.uid][p] = true;
                return true;
            }
        });
    };
    ProxyMgr.createEquipment = function (uid, dataKey, arg) {
        var obj;
        if (typeof arg == "number")
            obj = new Item_1.Equipment(arg);
        else
            obj = arg ? Object.assign(new Item_1.Equipment(0), arg) : null;
        return obj ? this.decodeProxy(uid, dataKey, obj, obj) : null;
    };
    ProxyMgr.createItem = function (uid, dataKey, arg1, arg2) {
        var obj;
        if (typeof arg1 == "number")
            obj = new Item_1.ItemBase(arg1, arg2);
        else
            obj = arg1 ? Object.assign(new Item_1.ItemBase(0, 0), arg1) : null;
        return obj ? this.decodeProxy(uid, dataKey, obj, obj) : null;
    };
    ProxyMgr.createArray = function (uid, dataKey, source) {
        var _this = this;
        var obj = source || [];
        if (obj[this.ProxyKey])
            return obj;
        var result = new Proxy(obj, {
            set: function (target, p, value, receiver) {
                var type = value.constructor.name;
                switch (type) {
                    case "Number" /* DataType.Number */:
                    case "String" /* DataType.String */:
                    case "Boolean" /* DataType.Boolean */:
                        target[p] = value;
                        break;
                    case "Object" /* DataType.Object */:
                        target[p] = _this.createObj(uid, dataKey, value);
                        break;
                    case "Array" /* DataType.Array */:
                        target[p] = _this.createArray(uid, dataKey, value);
                        break;
                    case "ItemBase" /* DataType.ItemBase */:
                        target[p] = _this.createItem(uid, dataKey, value);
                        break;
                    case "Equipment" /* DataType.Equipment */:
                        target[p] = _this.createEquipment(uid, dataKey, value);
                        break;
                    default: throw new Error("unknown type => " + type);
                }
                ProxyMgr.proxyMap[uid][dataKey] = true;
                return true;
            }
        });
        result[this.ProxyKey] = true;
        return result;
    };
    ProxyMgr.createObj = function (uid, dataKey, source) {
        var obj = source || {};
        return this.decodeProxy(uid, dataKey, obj, obj);
    };
    ProxyMgr.ProxyKey = Symbol(111);
    ProxyMgr.proxyMap = new Proxy({}, {
        get: function (target, p, receiver) {
            if (target[p] === void 0)
                target[p] = {};
            return target[p];
        }
    });
    return ProxyMgr;
}());
exports.ProxyMgr = ProxyMgr;
