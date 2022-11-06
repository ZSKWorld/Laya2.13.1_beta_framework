"use strict";
exports.__esModule = true;
exports.UserData = void 0;
var TimeUtil_1 = require("../../utils/TimeUtil");
var Util_1 = require("../../utils/Util");
var Bag_1 = require("./Bag");
var UserDataUtil_1 = require("./UserDataUtil");
var UserData = /** @class */ (function () {
    //#endregion
    function UserData(account, password, nickname) {
        if (account === void 0) { account = ""; }
        if (password === void 0) { password = ""; }
        if (nickname === void 0) { nickname = ""; }
        //#region 字段
        this.uid = Util_1.Util.CreateUID();
        this.nickname = "";
        this.account = "";
        this.password = "";
        this.registerTime = TimeUtil_1.TimeUtil.getTimeStamp();
        this.lastLoginTime = 0;
        this.lastOnlineTime = 0;
        /** 离线数据 */
        this.offline = null;
        /** 背包数据 */
        this.bag = new Bag_1.Bag();
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
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
        this.vigor = UserDataUtil_1.UserDataUtil.getMaxVigro(this.citta);
    }
    UserData.prototype.loginInit = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (v) { return _this[v] = data[v]; });
        this.offline = this.initOffline();
        this.lastLoginTime = TimeUtil_1.TimeUtil.getTimeStamp();
    };
    UserData.prototype.save = function () {
        this.offline = null;
        this.lastOnlineTime = TimeUtil_1.TimeUtil.getTimeStamp();
        Util_1.Util.saveData(this);
    };
    UserData.prototype.initOffline = function () {
        if (!this.lastOnlineTime)
            return null;
        var timeOffset = ((TimeUtil_1.TimeUtil.getTimeStamp() - this.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5)
            return null;
        else
            return { offlineTime: timeOffset, vigor: (UserDataUtil_1.UserDataUtil.getVigorRecoveryRate(this.citta) * timeOffset) << 0 };
    };
    return UserData;
}());
exports.UserData = UserData;
