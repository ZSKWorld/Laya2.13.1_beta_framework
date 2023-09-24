/**The class is automatically generated by BatMain.bat , please do not modify */

import { websocket } from "./WebSocket";

class BaseService<T> {
    protected _proxy: T;
    protected constructor() {
        const serviceKeys = [ "register", "login", "signIn", "clearAccount", "useItem", "sellItem", "changeCollect", "decomposeGem", "dressEquip", "takeOffEquip", "sellEquip", "decomposeEquip", "enterBattle", "requestBattle", "existBattle", "addFriend", "friendMsg", "buyGoods", ];
        serviceKeys.forEach(key => {
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: false,
                value: function (data: UserInput) {
                    data.cmd = key;
                    websocket.sendMsg(data);
                }
            })
        });
    }
}

function ServiceInst<T>() {
    return class ServiceInst extends BaseService<T>{
        protected static _inst: ServiceInst;
        static get Inst() { return (this._inst || (this._inst = new this())) as unknown as T; }
    }
}

export const AccountService = ServiceInst<IAccountCtrl>();
export const BagService = ServiceInst<IBagCtrl>();
export const BattleService = ServiceInst<IBattleCtrl>();
export const FriendService = ServiceInst<IFriendCtrl>();
export const ShopService = ServiceInst<IShopCtrl>();