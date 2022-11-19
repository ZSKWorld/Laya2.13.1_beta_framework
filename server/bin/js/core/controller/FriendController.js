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
exports.FriendController = void 0;
var ConnectionMgr_1 = require("../ConnectionMgr");
var BaseController_1 = require("./BaseController");
var FriendController = /** @class */ (function (_super) {
    __extends(FriendController, _super);
    function FriendController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendController.prototype.friendMsg = function (data) {
        var friendCon = ConnectionMgr_1.connectionMgr.getConnection(data.friendUid);
        if (friendCon) {
            friendCon.notify({ cmd: "friendMsg", data: data.chatMsg });
        }
        this.response(data.cmd);
    };
    __decorate([
        BaseController_1.AddCMD
    ], FriendController.prototype, "friendMsg");
    return FriendController;
}(BaseController_1.BaseController));
exports.FriendController = FriendController;
