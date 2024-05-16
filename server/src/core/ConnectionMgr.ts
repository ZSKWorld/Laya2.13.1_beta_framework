import { Pool } from "../libs/Pool";
import { Timer } from "../libs/Timer";
import { GameUtil } from "../utils/GameUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { Connection } from "./Connection";
class ClosedConInfo {
    time: number;
    connection: Connection;
}

class ConnectionMgr {
    private readonly ConInfoKey = GameUtil.getUUID();
    private readonly ClosedConExistTime = 30000;
    private closedConnection: { [key: string]: ClosedConInfo } = {};
    constructor() {
        Timer.timer.loop(1000, this, this.clearClosedConnection);
    }

    getConnection(token: string) {
        const closedCon = this.closedConnection[token];
        if (closedCon) {
            const con = closedCon.connection;
            closedCon.time = 0;
            closedCon.connection = null;
            Pool.recover(this.ConInfoKey, closedCon);
            delete this.closedConnection[token];
            return con;
        }
        return null;
    }

    closeConnection(token: string, connection: Connection) {
        if (this.closedConnection[token]) return;
        const closedCon = Pool.get(this.ConInfoKey, ClosedConInfo);
        closedCon.time = TimeUtil.milliSeconds();
        closedCon.connection = connection;
        this.closedConnection[token] = closedCon;
    }

    private clearClosedConnection() {
        const time = TimeUtil.milliSeconds();
        const { closedConnection, ClosedConExistTime } = this;
        Object.keys(closedConnection).forEach(v => {
            const con = closedConnection[v];
            if (time - con.time > ClosedConExistTime) {
                con.connection.clear();
                Pool.recover(this.ConInfoKey, con);
                delete closedConnection[v];
            }
        });
    }
}

export const connectionMgr = new ConnectionMgr();