import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { Pool, PoolKey } from "../libs/pool/Pool";
import { connectionMgr } from "./ConnectionMgr";
import { AccouontController } from "./controller/account/AccouontController";
import { BaseController } from "./controller/BaseController";
import { HeartController } from "./controller/heart/HeartController";
import { BattleController } from "./controller/battle/BattleController";
import { FriendController } from "./controller/friend/FriendController";
import { ItemController } from "./controller/item/ItemController";
import { ShopController } from "./controller/shop/ShopController";
import { ErrorCode } from "./enum/ErrorCode";
import { ProxyMgr } from "../utils/ProxyMgr";
import { User } from "./data/User";
const enum ConnectionEvent {
    Message = "message",
    Close = "close",
}
export class Connection {
    private _onClose = () => this.onConnectionClose();
    private _onMessage = (message) => this.onConnectionMessage(message);

    private _listener: EventDispatcher;
    private _controllers: BaseController[] = [];

    private _logined: boolean;
    private _connection: websocket.connection;
    private _user: IUser;
    get logined() { return !!this._logined; }
    get listener() { return this._listener; }
    get user() { return this._user; }

    static startConnection(token: string, connection: websocket.connection, msg?: websocket.Message) {
        let con = connectionMgr.getClosedConnection(token);
        if (!con) con = Pool.get(PoolKey.CommonConnection, Connection);
        con.setConnection(connection);
        con.onConnectionMessage(msg);
    }

    setConnection(connection: websocket.connection) {
        if (!connection) return;
        if (this._connection) return;
        this._connection = connection;
        if (!this._listener) {
            this._listener = Pool.get(PoolKey.EventDispatcher, EventDispatcher);
        }
        if (!this._controllers || !this._controllers.length) {
            this._controllers = this._controllers || [];
            this._controllers.push(
                AccouontController.create(this),
                BattleController.create(this),
                HeartController.create(this),
                ItemController.create(this),
                ShopController.create(this),
                FriendController.create(this),
            );
        }

        connection.on(ConnectionEvent.Close, this._onClose);
        connection.on(ConnectionEvent.Message, this._onMessage);
    }

    userLogin(data: IUser) {
        this._logined = true;
        this._user = ProxyMgr.getProxy(data.account.uid, null, new User("", "", ""));
        connectionMgr.addConnection(data.account.uid, this);
        this._user.login(data);
    }

    response(data: UserOutput) {
        if (!this._connection) return;
        if (data.cmd != "heart" && this._user) {
            const userSyncInfo = this._user.getSyncInfo();
            if (userSyncInfo) {
                if (!data.syncInfo) data.syncInfo = userSyncInfo;
                else data.syncInfo = Object.assign(userSyncInfo, data.syncInfo);
            }
        }
        data.type = "response";
        this._connection.sendUTF(JSON.stringify(data));
    }

    notify(data: UserNotify) {
        if (!this._connection) return;
        data.type = "notify ";
        this._connection.sendUTF(JSON.stringify(data));
    }

    clear() {
        if (this._connection) {
            this._connection.off(ConnectionEvent.Close, this._onClose);
            this._connection.off(ConnectionEvent.Message, this._onMessage);
        }

        this._listener.offAll();
        Pool.recover(PoolKey.EventDispatcher, this._listener);
        this._listener = null;

        this._controllers.forEach(v => v.recover());
        this._controllers.length = 0;

        this._logined = false;

        this._connection = null;

        this._user?.logout();
        this._user = null;
        Pool.recover(PoolKey.CommonConnection, this);
    }

    private onConnectionMessage(message: websocket.Message) {
        if (message.type === 'utf8') {
            this._user && this._user.clearSyncInfo();
            const data: UserInput = JSON.parse(message.utf8Data);
            if (data.cmd != "register" && data.cmd != "login" && !this._logined)
                return this.response({ cmd: data.cmd, error: ErrorCode.NOT_LOGIN });
            if (this._listener.hasListener(data.cmd)) {
                this._listener.event(data.cmd, data);
            }
            else
                this.response({ cmd: data.cmd, error: ErrorCode.UNKNOWN_CMD });
        }
        else {
            this.response({ cmd: "", error: ErrorCode.UNKNOWN_DATA_TYPE });
        }
    }

    private onConnectionClose() {
        this._logined = false;
        this._connection = null;
        this._user?.logout();
        connectionMgr.connectionClosed(this._user.account.account, this);
    }
}