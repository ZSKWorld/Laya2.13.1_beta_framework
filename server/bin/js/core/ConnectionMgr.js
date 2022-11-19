"use strict";
exports.__esModule = true;
exports.connectionMgr = void 0;
var Pool_1 = require("../libs/pool/Pool");
var ClosedConnection = /** @class */ (function () {
    function ClosedConnection() {
    }
    return ClosedConnection;
}());
var ConnectionMgr = /** @class */ (function () {
    function ConnectionMgr() {
        var _this = this;
        this.ClosedConExistTime = 30000;
        this.closedConnection = {};
        this.connectionUidMap = {};
        setInterval(function () { return _this.clearClosedConnection(); }, 1000);
    }
    ConnectionMgr.prototype.addConnection = function (uid, connection) {
        this.connectionUidMap[uid] = connection;
    };
    ConnectionMgr.prototype.getConnection = function (uid) {
        return this.connectionUidMap[uid];
    };
    ConnectionMgr.prototype.connectionClosed = function (token, connection) {
        if (this.closedConnection[token])
            return;
        var closedCon = Pool_1.Pool.get("ClosedConnection" /* PoolKey.ClosedConnection */, ClosedConnection);
        closedCon.time = Date.now();
        closedCon.connection = connection;
        this.closedConnection[token] = closedCon;
        delete this.connectionUidMap[token];
    };
    ConnectionMgr.prototype.getClosedConnection = function (token) {
        var closedCon = this.closedConnection[token];
        if (closedCon) {
            var con = closedCon.connection;
            closedCon.time = 0;
            closedCon.connection = null;
            Pool_1.Pool.recover("ClosedConnection" /* PoolKey.ClosedConnection */, closedCon);
            delete this.closedConnection[token];
            return con;
        }
        return null;
    };
    ConnectionMgr.prototype.clearClosedConnection = function () {
        var time = Date.now();
        var _a = this, closedCons = _a.closedConnection, existTime = _a.ClosedConExistTime;
        Object.keys(closedCons).forEach(function (v) {
            var con = closedCons[v];
            if (time - con.time > existTime) {
                con.connection.clear();
                Pool_1.Pool.recover("ClosedConnection" /* PoolKey.ClosedConnection */, con);
                delete closedCons[v];
            }
        });
    };
    return ConnectionMgr;
}());
exports.connectionMgr = new ConnectionMgr();
