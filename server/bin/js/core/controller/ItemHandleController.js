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
exports.ItemHandleController = void 0;
var BaseController_1 = require("./BaseController");
var ItemHandleController = /** @class */ (function (_super) {
    __extends(ItemHandleController, _super);
    function ItemHandleController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemHandleController.prototype.useItem = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkUseItem(data.id, data.count);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.useItem(data.id, data.count);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.sellItem = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkSellItem(data.id, data.count);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.sellItem(data.id, data.count);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.dressEquip = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkDressEquip(data.uid);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.dressEquip(data.uid);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.takeOffEquip = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkTakeOffEquip(data.part);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.takeOffEquip(data.part);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.sellEquip = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkSellEquip(data.uid);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.sellEquip(data.uid);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.changeCollect = function (data) {
        var userData = this.connection.userData;
        var errorCode = userData.checkCollect(data.id, data.collect);
        if (errorCode)
            this.response(data.cmd, null, errorCode);
        else {
            userData.changeCollect(data.id, data.collect);
            this.response(data.cmd);
        }
    };
    ItemHandleController.prototype.decomposeEquip = function (data) {
        var userData = this.connection.userData;
        userData.decomposeEquip(data.star);
        this.response(data.cmd);
    };
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "useItem");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "sellItem");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "dressEquip");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "takeOffEquip");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "sellEquip");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "changeCollect");
    __decorate([
        BaseController_1.AddCMD
    ], ItemHandleController.prototype, "decomposeEquip");
    return ItemHandleController;
}(BaseController_1.BaseController));
exports.ItemHandleController = ItemHandleController;
