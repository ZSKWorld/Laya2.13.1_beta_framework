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
exports.LoginController = void 0;
var Util_1 = require("../../utils/Util");
var BaseController_1 = require("./BaseController");
var LoginController = /** @class */ (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginController.prototype.login = function (data) {
        var userData;
        if (this.connection.logined == false) {
            userData = Util_1.Util.getData(data.account, data.password);
            if (!userData)
                return this.response(data.cmd, null, 1002 /* ErrorCode.USER_NOT_EXIST */);
            else
                this.connection.userLogin(userData);
        }
        userData = JSON.parse(JSON.stringify(this.connection.playerData));
        this.response(data.cmd, { syncInfo: userData });
    };
    __decorate([
        BaseController_1.AddCMD
    ], LoginController.prototype, "login");
    return LoginController;
}(BaseController_1.BaseController));
exports.LoginController = LoginController;
