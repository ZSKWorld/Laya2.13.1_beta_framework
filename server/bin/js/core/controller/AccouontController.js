"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccouontController = void 0;
var Util_1 = require("../../utils/Util");
var UserData_1 = require("../userdata/UserData");
var BaseController_1 = require("./BaseController");
var AccouontController = /** @class */ (function (_super) {
    __extends(AccouontController, _super);
    function AccouontController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccouontController.prototype.register = function (data) {
        var userData = Util_1.Util.getData(data.account);
        if (userData)
            this.response(data.cmd, null, 1003 /* ErrorCode.USER_EXIST */);
        else {
            if (!data.account)
                this.response(data.cmd, null, 1004 /* ErrorCode.ACCOUNT_IS_EMPTY */);
            else if (!data.password)
                this.response(data.cmd, null, 1005 /* ErrorCode.PASSWORD_IS_EMPTY */);
            else if (!data.nickname)
                this.response(data.cmd, null, 1006 /* ErrorCode.NICKNAME_IS_EMPTY */);
            else {
                new UserData_1.UserData(data.account, data.password, data.nickname).save();
                this.response(data.cmd);
            }
        }
    };
    AccouontController.prototype.login = function (data) {
        if (this.connection.logined) {
            this.response(data.cmd);
            // this.response(data.cmd, null, ErrorCode.USER_LOGINED);
        }
        else {
            var userData = Util_1.Util.getData(data.account);
            if (!userData)
                return this.response(data.cmd, null, 1002 /* ErrorCode.USER_NOT_EXIST */);
            else
                this.connection.userLogin(userData);
            this.response(data.cmd);
        }
    };
    AccouontController.prototype.clearAccount = function (data) {
        var userData = this.connection.userData;
        new UserData_1.UserData(userData.account, userData.password, userData.nickname).save();
        var newData = Util_1.Util.getData(userData.account);
        this.connection.userLogin(newData);
        this.response(data.cmd);
    };
    __decorate([
        BaseController_1.AddCMD
    ], AccouontController.prototype, "register");
    __decorate([
        BaseController_1.AddCMD
    ], AccouontController.prototype, "login");
    __decorate([
        BaseController_1.AddCMD
    ], AccouontController.prototype, "clearAccount");
    return AccouontController;
}(BaseController_1.BaseController));
exports.AccouontController = AccouontController;
