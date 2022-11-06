"use strict";
exports.__esModule = true;
exports.Pool = void 0;
var Pool = /** @class */ (function () {
    function Pool() {
    }
    Pool.get = function (key, cls) {
        var pool = this._pool[key];
        if (!pool || pool.length === 0)
            return new cls();
        else
            return pool.pop();
    };
    Pool.recover = function (key, value) {
        if (!value)
            return;
        var pool = this._pool[key];
        if (!pool)
            this._pool[key] = [value];
        else
            pool.push(value);
    };
    Pool._pool = {};
    return Pool;
}());
exports.Pool = Pool;
