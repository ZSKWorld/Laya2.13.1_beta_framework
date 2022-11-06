"use strict";
exports.__esModule = true;
exports.AddCMD = exports.BaseController = void 0;
var BaseController = /** @class */ (function () {
    function BaseController(connection) {
        this.connection = connection;
        if (this._cmds) {
            for (var key in this._cmds) {
                this.connection.listener.on(key, this, this[key]);
            }
        }
        this.onConstruct();
    }
    BaseController.prototype.onConstruct = function () { };
    BaseController.prototype.clear = function () {
        this._cmds = null;
        this.connection = null;
    };
    BaseController.prototype.response = function (cmd, data, error) {
        if (error === void 0) { error = 0 /* ErrorCode.NONE */; }
        if (this.connection) {
            var args = {
                cmd: cmd,
                error: error
            };
            if (data)
                args = Object.assign(args, data);
            this.connection.response(args);
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
