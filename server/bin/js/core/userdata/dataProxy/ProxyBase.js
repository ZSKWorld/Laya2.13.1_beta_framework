"use strict";
exports.__esModule = true;
exports.ProxyBase = void 0;
var ProxyBase = /** @class */ (function () {
    function ProxyBase(data) {
        this._data = data;
    }
    Object.defineProperty(ProxyBase.prototype, "data", {
        get: function () { return this._data; },
        enumerable: false,
        configurable: true
    });
    return ProxyBase;
}());
exports.ProxyBase = ProxyBase;
