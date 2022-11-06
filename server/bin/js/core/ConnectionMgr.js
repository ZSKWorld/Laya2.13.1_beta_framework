"use strict";
exports.__esModule = true;
exports.connectionMgr = void 0;
var ConnectionMgr = /** @class */ (function () {
    function ConnectionMgr() {
        this.connectionUidMap = {};
        this.connectionAccMap = {};
    }
    ConnectionMgr.prototype.addConnection = function (uid, account, connection) {
        this.connectionUidMap[uid] = connection;
        this.connectionAccMap[account] = connection;
    };
    ConnectionMgr.prototype.removeConnectionByUid = function (uid) {
        var connection = this.connectionUidMap[uid];
        delete this.connectionUidMap[uid];
        for (var key in this.connectionAccMap) {
            var element = this.connectionAccMap[key];
            if (element == connection) {
                delete this.connectionAccMap[key];
                return;
            }
        }
    };
    ConnectionMgr.prototype.removeConnectionByAcc = function (account) {
        var connection = this.connectionAccMap[account];
        delete this.connectionAccMap[account];
        for (var key in this.connectionUidMap) {
            var element = this.connectionUidMap[key];
            if (element == connection) {
                delete this.connectionUidMap[key];
                return;
            }
        }
    };
    ConnectionMgr.prototype.getConnectionByUid = function (uid) {
        return this.connectionUidMap[uid];
    };
    ConnectionMgr.prototype.getConnectionByAcc = function (account) {
        return this.connectionAccMap[account];
    };
    return ConnectionMgr;
}());
exports.connectionMgr = new ConnectionMgr();
