"use strict";
exports.__esModule = true;
exports.Connection = void 0;
var websocket = require("websocket");
var EventDispatcher_1 = require("../libs/event/EventDispatcher");
var Pool_1 = require("../libs/pool/Pool");
var ConnectionMgr_1 = require("./ConnectionMgr");
var BattleController_1 = require("./controller/BattleController");
var HeartController_1 = require("./controller/HeartController");
var ItemHandleController_1 = require("./controller/ItemHandleController");
var LoginController_1 = require("./controller/LoginController");
var RegisterController_1 = require("./controller/RegisterController");
var ShopController_1 = require("./controller/ShopController");
var UserDataProxy_1 = require("./userdata/dataProxy/UserDataProxy");
var Connection = /** @class */ (function () {
    function Connection(connection) {
        var _this = this;
        this._listener = Pool_1.Pool.get("EventDispatcher" /* PoolKey.EventDispatcher */, EventDispatcher_1.EventDispatcher);
        this._controllers = [
            new BattleController_1.BattleController(this),
            new HeartController_1.HeartController(this),
            new RegisterController_1.RegisterController(this),
            new LoginController_1.LoginController(this),
            new ItemHandleController_1.ItemHandleController(this),
            new ShopController_1.ShopController(this),
        ];
        this._socket = connection;
        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                if (data.cmd != "register" && data.cmd != "login" && !_this._logined)
                    return _this.response({ cmd: data.cmd, error: 1007 /* ErrorCode.NOT_LOGIN */ });
                if (_this._listener.hasListener(data.cmd))
                    _this._listener.event(data.cmd, data);
                else
                    _this.response({ cmd: data.cmd, error: 1000 /* ErrorCode.UNKNOWN_CMD */ });
            }
            // else if (message.type === 'binary') {
            //     connection.sendBytes(message.binaryData);
            // }
        });
        connection.on('close', function (code, desc) {
            _this.connectionClose();
        });
    }
    Object.defineProperty(Connection.prototype, "logined", {
        get: function () { return !!this._logined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "userData", {
        get: function () { return this._userData; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "listener", {
        get: function () { return this._listener; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "socket", {
        get: function () { return this._socket; },
        enumerable: false,
        configurable: true
    });
    Connection.prototype.userLogin = function (data) {
        var oldConnection = ConnectionMgr_1.connectionMgr.getConnectionByUid(data.uid);
        if (oldConnection && oldConnection != this) {
            oldConnection.response({ cmd: "", error: 1008 /* ErrorCode.LOGIN_OTHER_PLACE */ });
            oldConnection._socket.close(websocket.connection.CLOSE_REASON_NORMAL, "login other place");
        }
        if (!this._logined) {
            this._userData = new UserDataProxy_1.UserDataProxy();
            this._userData.login(data);
            this._logined = true;
            ConnectionMgr_1.connectionMgr.addConnection(data.uid, data.account, this);
        }
    };
    Connection.prototype.response = function (data) {
        this._socket.sendUTF(JSON.stringify(data));
    };
    Connection.prototype.connectionClose = function () {
        if (this._userData) {
            this._userData.logout();
            ConnectionMgr_1.connectionMgr.removeConnectionByUid(this._userData.getUid());
        }
        this._listener.offAll();
        Pool_1.Pool.recover("EventDispatcher" /* PoolKey.EventDispatcher */, this._listener);
        this._controllers.forEach(function (v) { return v.clear(); });
        this._logined = false;
        this._listener = null;
        this._socket = null;
        this._userData = null;
        this._controllers = null;
    };
    return Connection;
}());
exports.Connection = Connection;