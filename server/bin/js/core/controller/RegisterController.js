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
exports.RegisterController = void 0;
var Util_1 = require("../../utils/Util");
var UserData_1 = require("../userdata/UserData");
var BaseController_1 = require("./BaseController");
var RegisterController = /** @class */ (function (_super) {
    __extends(RegisterController, _super);
    function RegisterController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegisterController.prototype.register = function (data) {
        var userData = Util_1.Util.getData(data.account, data.password);
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
                Util_1.Util.saveData(new UserData_1.UserData(data.account, data.password, data.nickname));
                this.response(data.cmd, null);
            }
        }
    };
    __decorate([
        BaseController_1.AddCMD
    ], RegisterController.prototype, "register");
    return RegisterController;
}(BaseController_1.BaseController));
exports.RegisterController = RegisterController;
