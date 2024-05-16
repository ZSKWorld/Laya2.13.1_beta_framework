import * as websocket from "websocket";
import { Pool } from "../libs/Pool";
import { Timer } from "../libs/Timer";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { GameUtil } from "../utils/GameUtil";
import { Logger } from "../utils/Logger";
import { ProxyMgr } from "../utils/ProxyMgr";
import { UserUtil } from "../utils/UserUtil";
import { connectionMgr } from "./ConnectionMgr";
import { BattleProcessor } from "./battle/BattleProcessor";
import { CMDController } from "./controller/cmd/CMDController";
import { CMDAccouont } from "./controller/cmd/account/CMDAccouont";
import { CMDBag } from "./controller/cmd/bag/CMDBag";
import { CMDBattle } from "./controller/cmd/battle/CMDBattle";
import { CMDFriend } from "./controller/cmd/friend/CMDFriend";
import { CMDShop } from "./controller/cmd/shop/CMDShop";
import { NotifyController } from "./controller/notify/NotifyController";
import { NotifyAccount } from "./controller/notify/account/NotifyAccount";
import { NotifyBase } from "./controller/notify/base/NotifyBase";
import { NotifyHeart } from "./controller/notify/heart/NotifyHeart";
import { ErrorCode } from "./enum/ErrorCode";
import { MessageType } from "./enum/MessageType";
import { User } from "./userdata/User";
const enum ConnectionEvent {
    Message = "message",
    Close = "close",
}
export class Connection {
    private static readonly PoolKey = GameUtil.getUUID();
    private _onMessage = (message) => this.onConnectionMessage(message);
    private _onClose = () => this.onConnectionClose();

    private _logined: boolean;
    private _token: string;
    private _listener: EventDispatcher;
    private _cmds: CMDController[] = [];
    private _notifies: NotifyController[] = [];

    private _user: IUser;
    private _connection: websocket.connection;
    private _battleProcessor: BattleProcessor;
    get listener() { return this._listener; }
    get logined() { return !!this._logined; }
    get user() { return this._user; }
    get battleProcessor() { return this._battleProcessor; }

    private static checkLogin(data: ILoginInput) {
        if (!UserUtil.userExist(data.account)) return ErrorCode.USER_NOT_EXIST;
        const userData = UserUtil.getData(data.account);
        if (userData.account.password != data.password) return ErrorCode.PASSWORD_ERROR;
        return ErrorCode.NONE;
    }

    private static checkRegister(data: IRegisterInput) {
        if (UserUtil.userExist(data.account)) return ErrorCode.USER_EXIST;
        if (!data.account) return ErrorCode.ACCOUNT_EMPTY;
        else if (!data.password) return ErrorCode.PASSWORD_EMPTY;
        else if (!data.nickname) return ErrorCode.NICKNAME_EMPTY;
        return ErrorCode.NONE;
    }

    static startConnection(input: IUserInput, connection: websocket.connection, msg?: websocket.Message) {
        let token: string;
        let con: Connection;
        if (input.cmd == "login") {
            const loginInput = input as ILoginInput;
            token = GameUtil.base64encode(loginInput.account + loginInput.password);
            con = connectionMgr.getConnection(token);
            if (!con) {
                const errorCode = this.checkLogin(loginInput);
                if (errorCode) return connection.sendUTF(JSON.stringify({
                    type: MessageType.Response,
                    cmd: loginInput.cmd,
                    error: errorCode
                }));
            }
        } else if (input.cmd == "register") {
            const registerInput = input as IRegisterInput;
            const errorCode = this.checkRegister(registerInput);
            if (errorCode) {
                return connection.sendUTF(JSON.stringify({
                    type: MessageType.Response,
                    cmd: registerInput.cmd,
                    error: errorCode,
                }));
            }
        } else return connection.sendUTF(JSON.stringify({
            type: MessageType.Response,
            cmd: input.cmd,
            error: ErrorCode.NOT_LOGIN
        }));
        con ||= Pool.get(this.PoolKey, Connection);
        con._token = token;
        con.setConnection(connection);
        con.onConnectionMessage(msg);
        Logger.log("start connection");
    }

    constructor() {
        Logger.log("new connection");
    }

    setConnection(connection: websocket.connection) {
        if (!connection) return;
        if (this._connection) return;
        this._connection = connection;
        this._listener ||= EventDispatcher.create();
        if (!this._cmds.length) {
            this._cmds.push(
                CMDAccouont.create(this),
                CMDBag.create(this),
                CMDBattle.create(this),
                CMDFriend.create(this),
                CMDShop.create(this),
            );
        }
        if (!this._notifies.length) {
            this._notifies.push(
                NotifyAccount.create(this),
                NotifyBase.create(this),
                NotifyHeart.create(this),
            );
        }
        this._battleProcessor ||= new BattleProcessor();

        connection.removeAllListeners(ConnectionEvent.Message);
        connection.on(ConnectionEvent.Message, this._onMessage);
        connection.on(ConnectionEvent.Close, this._onClose);
        Logger.log("set connection");
    }

    userLogin(data: OriginData<IUser>) {
        this._logined = true;
        this._user ||= ProxyMgr.getProxy(data.account.uid, null, new User());
        this._user.decode(data);
        this._battleProcessor.init(this._user);
        Timer.timer.frameLoop(1, this, this.update);
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
        Logger.log("clear connection");
        Timer.timer.clearAll(this);

        this._logined = false;
        this._token = null;
        this._listener.offAll();
        EventDispatcher.recover(this._listener);
        this._listener = null;

        this._cmds.forEach(v => v.recover());
        this._cmds.length = 0;
        this._notifies.forEach(v => v.recover());
        this._notifies.length = 0;

        this._user?.save();
        this._user = null;
        this._connection?.off(ConnectionEvent.Close, this._onClose);
        this._connection?.off(ConnectionEvent.Message, this._onMessage);
        this._connection = null;
        this._battleProcessor?.clear();
        Pool.recover(Connection.PoolKey, this);
    }

    private update() {
        const deltaTime = Timer.timer.delta;
        this._cmds.forEach(v => v.update(deltaTime));
        this._notifies.forEach(v => v.update(deltaTime));
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
        this._connection?.off(ConnectionEvent.Close, this._onClose);
        this._connection?.off(ConnectionEvent.Message, this._onMessage);
        this._connection = null;
        this._cmds.forEach(v => v.close());
        this._notifies.forEach(v => v.close());
        this._user?.save();
        this._battleProcessor?.exit();
        connectionMgr.closeConnection(this._token, this);
    }
}