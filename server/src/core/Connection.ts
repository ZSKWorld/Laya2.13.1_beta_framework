import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { Pool, PoolKey } from "../libs/pool/Pool";
import { ProxyMgr } from "../utils/ProxyMgr";
import { TimeUtil } from "../utils/TimeUtil";
import { connectionMgr } from "./ConnectionMgr";
import { CMDController } from "./controller/cmd/CMDController";
import { CMDAccouont } from "./controller/cmd/account/CMDAccouont";
import { CMDBag } from "./controller/cmd/bag/CMDBag";
import { CMDBattle } from "./controller/cmd/battle/CMDBattle";
import { CMDFriend } from "./controller/cmd/friend/CMDFriend";
import { CMDShop } from "./controller/cmd/shop/CMDShop";
import { NotifyController } from "./controller/notify/NotifyController";
import { NotifyAccount } from "./controller/notify/account/NotifyAccount";
import { NotifyBase } from "./controller/notify/base/NotifyBase";
import { ErrorCode } from "./enum/ErrorCode";
import { MessageType } from "./enum/MessageType";
import { User } from "./userdata/User";
import { NotifyHeart } from "./controller/notify/heart/NotifyHeart";
import { Color, Logger } from "../utils/Logger";
const enum ConnectionEvent {
    Message = "message",
    Close = "close",
}
export class Connection {
    private _onClose = () => this.onConnectionClose();
    private _onMessage = (message) => this.onConnectionMessage(message);

    private _token: string;
    private _listener: EventDispatcher;
    private _cmds: CMDController[];
    private _notifies: NotifyController[];
    private _intervalId: NodeJS.Timer;

    private _logined: boolean;
    private _user: IUser;
    private _connection: websocket.connection;
    get listener() { return this._listener; }
    get logined() { return !!this._logined; }
    get user() { return this._user; }

    static startConnection(token: string, connection: websocket.connection, msg?: websocket.Message) {
        let con = connectionMgr.getClosedConnection(token);
        if (!con) con = Pool.get(PoolKey.CommonConnection, Connection);
        con._token = token;
        con.setConnection(connection);
        con.onConnectionMessage(msg);
    }

    setConnection(connection: websocket.connection) {
        if (!connection) return;
        if (this._connection) return;
        Logger.log("set connection " + this._logined);
        this._connection = connection;
        if (!this._listener) {
            this._listener = Pool.get(PoolKey.EventDispatcher, EventDispatcher);
        }
        if (!this._cmds || !this._cmds.length) {
            this._cmds = this._cmds || [];
            this._cmds.push(
                CMDAccouont.create(this),
                CMDBag.create(this),
                CMDBattle.create(this),
                CMDFriend.create(this),
                CMDShop.create(this),
            );
        }
        if (!this._notifies || !this._notifies.length) {
            this._notifies = this._notifies || [];
            this._notifies.push(
                NotifyAccount.create(this),
                NotifyBase.create(this),
                NotifyHeart.create(this),
            );
        }

        connection.on(ConnectionEvent.Close, this._onClose);
        connection.on(ConnectionEvent.Message, this._onMessage);
    }

    userLogin(data: OriginData<IUser>) {
        if (!this._logined) {
            this._logined = true;
            this._user = ProxyMgr.getProxy(data.account.uid, null, new User("", "", ""));
            connectionMgr.addConnection(data.account.uid, this);
            this._user.decode(data);
            clearInterval(this._intervalId);
            let lastTime = TimeUtil.getTimeStamp();
            this._intervalId = setInterval(() => {
                const time = TimeUtil.getTimeStamp();
                const deltaTime = time - lastTime;
                this._cmds.forEach(v => v.update(deltaTime));
                this._notifies.forEach(v => v.update(deltaTime));
                lastTime = time;
            }, 16);
        }
    }

    sendMessage(type: MessageType, data: IUserOutput) {
        if (!this._connection) return;
        if (this._user) {
            const userSyncInfo = this._user.getSyncInfo();
            if (userSyncInfo) {
                if (!data.syncInfo) data.syncInfo = userSyncInfo;
                else data.syncInfo = Object.assign(userSyncInfo, data.syncInfo);
                this._user.clearSyncInfo();
            }
        }
        data.type = type;
        this._connection.sendUTF(JSON.stringify(data));
    }

    clear() {
        Logger.log("connection clear", Color.red);
        clearInterval(this._intervalId);
        this._intervalId = null;
        this._logined = false;
        this._connection?.off(ConnectionEvent.Close, this._onClose);
        this._connection?.off(ConnectionEvent.Message, this._onMessage);

        this._connection = null;

        this._listener.offAll();
        Pool.recover(PoolKey.EventDispatcher, this._listener);
        this._listener = null;

        if (this._cmds) {
            this._cmds.forEach(v => v.recover());
            this._cmds.length = 0;
        }

        if (this._notifies) {
            this._notifies.forEach(v => v.recover());
            this._notifies.length = 0;
        }

        this._user?.save();
        this._user = null;
        Pool.recover(PoolKey.CommonConnection, this);
    }

    private onConnectionMessage(message: websocket.Message) {
        if (message.type === 'utf8') {
            const data: IUserInput = JSON.parse(message.utf8Data);
            if (data.cmd != "register" && data.cmd != "login" && !this._logined)
                return this.sendMessage(MessageType.Response, { cmd: data.cmd, error: ErrorCode.NOT_LOGIN });
            if (this._listener.hasListener(data.cmd)) {
                this._listener.event(data.cmd, data);
            }
            else
                this.sendMessage(MessageType.Response, { cmd: data.cmd, error: ErrorCode.UNKNOWN_CMD });
        }
        else {
            this.sendMessage(MessageType.Response, { cmd: "", error: ErrorCode.UNKNOWN_DATA_TYPE });
        }
    }

    private onConnectionClose() {
        Logger.log("connection close", Color.red);
        this._connection?.off(ConnectionEvent.Close, this._onClose);
        this._connection?.off(ConnectionEvent.Message, this._onMessage);
        this._connection = null;
        this._cmds?.forEach(v => v.close());
        this._notifies?.forEach(v => v.close());
        this._user?.save();
        connectionMgr.connectionClosed(this._token, this);
    }
}