"use strict";
exports.__esModule = true;
exports.ProxyMgr = void 0;
var ProxyKey = Symbol(111);
var ProxyMgr = /** @class */ (function () {
    function ProxyMgr() {
    }
    ProxyMgr.getTargetProxy = function (uid, dataKey, target) {
        var _this = this;
        if (typeof target === "object" && target !== null && !target[ProxyKey]) {
            Object.keys(target).forEach(function (key) { return target[key] = _this.getTargetProxy(uid, dataKey || key, target[key]); });
            Object.defineProperty(target, "getSyncInfo", {
                value: function () {
                    var _this = this;
                    var keyMap = ProxyMgr.proxyMap[uid];
                    ProxyMgr.proxyMap[uid] = null;
                    if (keyMap) {
                        Object.keys(keyMap).forEach(function (key) { return keyMap[key] = _this[key]; });
                    }
                    return keyMap;
                },
                enumerable: false,
                configurable: false
            });
            Object.defineProperty(target, "clearSyncInfo", {
                value: function () { ProxyMgr.proxyMap[uid] = null; },
                enumerable: false,
                configurable: false
            });
            var result = new Proxy(target, {
                set: function (target, p, value, receiver) {
                    target[p] = ProxyMgr.getTargetProxy(uid, dataKey || p, value);
                    ProxyMgr.proxyMap[uid] = ProxyMgr.proxyMap[uid] || {};
                    ProxyMgr.proxyMap[uid][dataKey || p] = true;
                    return true;
                }
            });
            result[ProxyKey] = true;
            return result;
        }
        else
            return target;
    };
    ProxyMgr.proxyMap = {};
    return ProxyMgr;
}());
exports.ProxyMgr = ProxyMgr;
