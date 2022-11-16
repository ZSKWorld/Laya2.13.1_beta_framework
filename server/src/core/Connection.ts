import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { Pool, PoolKey } from "../libs/pool/Pool";
import { connectionMgr } from "./ConnectionMgr";
import { AccouontController } from "./controller/AccouontController";
import { BattleController } from "./controller/BattleController";
import { HeartController } from "./controller/HeartController";
import { ItemHandleController } from "./controller/ItemHandleController";
import { ShopController } from "./controller/ShopController";
import { ErrorCode } from "./enum/ErrorCode";
import { ProxyMgr } from "./userdata/ProxyMgr";
import { UserData } from "./userdata/UserData";
export class Connection {
    private _listener = Pool.get(PoolKey.EventDispatcher, EventDispatcher);
    private _controllers = [
        new AccouontController(this),
        new BattleController(this),
        new HeartController(this),
        new ItemHandleController(this),
        new ShopController(this),
    ];

    private _logined: boolean;
    private _socket: websocket.connection;
    private _userData: Readonly<UserData>;
    get logined() { return !!this._logined; }
    get userData() { return this._userData; }
    get socket() { return this._socket; }
    constructor(connection: websocket.connection) {
        this._socket = connection;
        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                this._userData && this._userData.clearSyncInfo();
                const data: UserInput = JSON.parse(message.utf8Data);
                if (data.cmd != "register" && data.cmd != "login" && !this._logined)
                    return this.response({ cmd: data.cmd, error: ErrorCode.NOT_LOGIN });
                if (this._listener.hasListener(data.cmd))
                    this._listener.event(data.cmd, data);
                else
                    this.response({ cmd: data.cmd, error: ErrorCode.UNKNOWN_CMD });
            }
            // else if (message.type === 'binary') {
            //     connection.sendBytes(message.binaryData);
            // }
        });
        connection.on('close', (code, desc) => {
            this.connectionClose();
        });
    }

    registerEvent(keyMap: any, caller: any) {
        if (keyMap) {
            for (let key in keyMap) {
                this._listener.on(key, caller, caller[ key ]);
            }
        }
    }

    userLogin(data: IUserData) {
        const oldConnection = connectionMgr.getConnectionByUid(data.uid);
        if (oldConnection && oldConnection != this) {
            oldConnection.response({ cmd: "", error: ErrorCode.LOGIN_OTHER_PLACE });
            oldConnection._socket.close(websocket.connection.CLOSE_REASON_NORMAL, "login other place");
        }
        if (!this._logined) {
            this._userData = ProxyMgr.getTargetProxy(data.uid, null, new UserData("", "", ""));
            this._logined = true;
            connectionMgr.addConnection(data.uid, data.account, this);
        }
        this._userData.login(data);
    }

    response(data: UserOutput) {
        if (data.cmd != "heart" && this._userData) {
            const userSyncInfo = this._userData.getSyncInfo();
            if (userSyncInfo) {
                if (!data.syncInfo) data.syncInfo = userSyncInfo;
                else data.syncInfo = Object.assign(userSyncInfo, data.syncInfo);
            }
        }
        this._socket.sendUTF(JSON.stringify(data));
    }

    private connectionClose() {
        if (this._userData) {
            this._userData.logout();
            connectionMgr.removeConnectionByUid(this._userData.uid);
        }
        this._listener.offAll();
        Pool.recover(PoolKey.EventDispatcher, this._listener);
        this._controllers.forEach(v => v.clear());
        this._logined = false;
        this._listener = null;
        this._socket = null;
        this._userData = null;
        this._controllers = null;
    }
}