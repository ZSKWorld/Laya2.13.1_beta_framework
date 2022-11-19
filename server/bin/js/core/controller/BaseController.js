"use strict";
exports.__esModule = true;
exports.AddCMD = exports.BaseController = void 0;
var Pool_1 = require("../../libs/pool/Pool");
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.create = function (connection) {
        var result = Pool_1.Pool.get(this.prototype.constructor.name, this);
        result.connection = connection;
        for (var key in result._cmds) {
            connection.listener.on(key, result, result[key]);
        }
        result.onCreate();
        return result;
    };
    BaseController.prototype.recover = function () {
        this.connection = null;
        Pool_1.Pool.recover(this.constructor.name, this);
    };
    BaseController.prototype.onCreate = function () { };
    BaseController.prototype.response = function (cmd, data, error) {
        if (data === void 0) { data = null; }
        if (error === void 0) { error = 0 /* ErrorCode.NONE */; }
        if (this.connection) {
            var args = { cmd: cmd, error: error };
            if (data)
                Object.assign(args, data);
            this.connection.response(args);
        }
    };
    BaseController.prototype.notify = function (cmd, data) {
        if (this.connection) {
            var args = { cmd: cmd, data: data };
            this.connection.notify(args);
        }
    };
    return BaseController;
}());
exports.BaseController = BaseController;
function AddCMD(target, propertyKey, descriptor) {
    target._cmds = target._cmds || {};
    target._cmds[propertyKey] = propertyKey;
}
exports.AddCMD = AddCMD;
