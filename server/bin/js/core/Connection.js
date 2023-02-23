"use strict";
exports.__esModule = true;
exports.Connection = void 0;
var EventDispatcher_1 = require("../libs/event/EventDispatcher");
var Pool_1 = require("../libs/pool/Pool");
var ConnectionMgr_1 = require("./ConnectionMgr");
var AccouontController_1 = require("./controller/account/AccouontController");
var HeartController_1 = require("./controller/base/HeartController");
var BattleController_1 = require("./controller/battle/BattleController");
var FriendController_1 = require("./controller/friend/FriendController");
var ItemHandleController_1 = require("./controller/item/ItemHandleController");
var ShopController_1 = require("./controller/shop/ShopController");
var ProxyMgr_1 = require("./user/ProxyMgr");
var User_1 = require("./user/User");
var Connection = /** @class */ (function () {
    function Connection() {
        var _this = this;
        this._onClose = function () { return _this.onConnectionClose(); };
        this._onMessage = function (message) { return _this.onConnectionMessage(message); };
        this._controllers = [];
    }
    Object.defineProperty(Connection.prototype, "logined", {
        get: function () { return !!this._logined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "listener", {
        get: function () { return this._listener; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "user", {
        get: function () { return this._user; },
        enumerable: false,
        configurable: true
    });
    Connection.startConnection = function (token, connection, msg) {
        var con = ConnectionMgr_1.connectionMgr.getClosedConnection(token);
        if (!con)
            con = Pool_1.Pool.get("CommonConnection" /* PoolKey.CommonConnection */, Connection);
        con.setConnection(connection);
        con.onConnectionMessage(msg);
    };
    Connection.prototype.setConnection = function (connection) {
        if (!connection)
            return;
        if (this._connection)
            return;
        this._connection = connection;
        if (!this._listener) {
            this._listener = Pool_1.Pool.get("EventDispatcher" /* PoolKey.EventDispatcher */, EventDispatcher_1.EventDispatcher);
        }
        if (!this._controllers || !this._controllers.length) {
            this._controllers = this._controllers || [];
            this._controllers.push(AccouontController_1.AccouontController.create(this), BattleController_1.BattleController.create(this), HeartController_1.HeartController.create(this), ItemHandleController_1.ItemHandleController.create(this), ShopController_1.ShopController.create(this), FriendController_1.FriendController.create(this));
        }
        connection.on("close" /* ConnectionEvent.Close */, this._onClose);
        connection.on("message" /* ConnectionEvent.Message */, this._onMessage);
    };
    Connection.prototype.userLogin = function (data) {
        this._logined = true;
        this._user = ProxyMgr_1.ProxyMgr.getProxy(data.uid, null, new User_1.User("", "", ""));
        ConnectionMgr_1.connectionMgr.addConnection(data.uid, this);
        this._user.login(data);
    };
    Connection.prototype.response = function (data) {
        if (!this._connection)
            return;
        if (data.cmd != "heart" && this._user) {
            var userSyncInfo = this._user.getSyncInfo();
            if (userSyncInfo) {
                if (!data.syncInfo)
                    data.syncInfo = userSyncInfo;
                else
                    data.syncInfo = Object.assign(userSyncInfo, data.syncInfo);
            }
        }
        data.type = "response";
        this._connection.sendUTF(JSON.stringify(data));
    };
    Connection.prototype.notify = function (data) {
        if (!this._connection)
            return;
        data.type = "notify ";
        this._connection.sendUTF(JSON.stringify(data));
    };
    Connection.prototype.clear = function () {
        var _a;
        if (this._connection) {
            this._connection.off("close" /* ConnectionEvent.Close */, this._onClose);
            this._connection.off("message" /* ConnectionEvent.Message */, this._onMessage);
        }
        this._listener.offAll();
        Pool_1.Pool.recover("EventDispatcher" /* PoolKey.EventDispatcher */, this._listener);
        this._listener = null;
        this._controllers.forEach(function (v) { return v.recover(); });
        this._controllers.length = 0;
        this._logined = false;
        this._connection = null;
        (_a = this._user) === null || _a === void 0 ? void 0 : _a.logout();
        this._user = null;
        Pool_1.Pool.recover("CommonConnection" /* PoolKey.CommonConnection */, this);
    };
    Connection.prototype.onConnectionMessage = function (message) {
        if (message.type === 'utf8') {
            this._user && this._user.clearSyncInfo();
            var data = JSON.parse(message.utf8Data);
            if (data.cmd != "register" && data.cmd != "login" && !this._logined)
                return this.response({ cmd: data.cmd, error: 1007 /* ErrorCode.NOT_LOGIN */ });
            if (this._listener.hasListener(data.cmd)) {
                this._listener.event(data.cmd, data);
            }
            else
                this.response({ cmd: data.cmd, error: 1000 /* ErrorCode.UNKNOWN_CMD */ });
        }
        else {
            this.response({ cmd: "", error: 1001 /* ErrorCode.UNKNOWN_DATA_TYPE */ });
        }
    };
    Connection.prototype.onConnectionClose = function () {
        var _a;
        this._logined = false;
        this._connection = null;
        (_a = this._user) === null || _a === void 0 ? void 0 : _a.logout();
        ConnectionMgr_1.connectionMgr.connectionClosed(this._user.account, this);
    };
    return Connection;
}());
exports.Connection = Connection;
