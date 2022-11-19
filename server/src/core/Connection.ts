import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { Pool, PoolKey } from "../libs/pool/Pool";
import { connectionMgr } from "./ConnectionMgr";
import { AccouontController } from "./controller/AccouontController";
import { BaseController } from "./controller/BaseController";
import { BattleController } from "./controller/BattleController";
import { FriendController } from "./controller/FriendController";
import { HeartController } from "./controller/HeartController";
import { ItemHandleController } from "./controller/ItemHandleController";
import { ShopController } from "./controller/ShopController";
import { ErrorCode } from "./enum/ErrorCode";
import { ProxyMgr } from "./userdata/ProxyMgr";
import { UserData } from "./userdata/UserData";
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
    private _userData: Readonly<UserData>;
    get logined() { return !!this._logined; }
    get listener() { return this._listener; }
    get userData() { return this._userData; }

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
                ItemHandleController.create(this),
                ShopController.create(this),
                FriendController.create(this),
            );
        }

        connection.on(ConnectionEvent.Close, this._onClose);
        connection.on(ConnectionEvent.Message, this._onMessage);
    }

    userLogin(data: IUserData) {
        this._logined = true;
        this._userData = ProxyMgr.getTargetProxy(data.uid, null, new UserData("", "", ""));
        connectionMgr.addConnection(data.uid, this);
        this._userData.login(data);
    }

    response(data: UserOutput) {
        if (!this._connection) return;
        if (data.cmd != "heart" && this._userData) {
            const userSyncInfo = this._userData.getSyncInfo();
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

        this._userData?.logout();
        this._userData = null;
        Pool.recover(PoolKey.CommonConnection, this);
    }

    private onConnectionMessage(message: websocket.Message) {
        if (message.type === 'utf8') {
            this._userData && this._userData.clearSyncInfo();
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
        this._userData?.logout();
        connectionMgr.connectionClosed(this._userData.account, this);
    }
}