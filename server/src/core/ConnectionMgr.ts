import { Pool, PoolKey } from "../libs/pool/Pool";
import { Connection } from "./Connection";
class ClosedConnection {
    time: number;
    connection: Connection;
}

class ConnectionMgr {
    private readonly ClosedConExistTime = 30000;
    private closedConnection: { [ key: string ]: ClosedConnection } = {};
    private connectionUidMap: { [ uid: string ]: Connection } = {};
    constructor() {
        setInterval(() => this.clearClosedConnection(), 1000);
    }
    addConnection(uid: string, connection: Connection) {
        this.connectionUidMap[ uid ] = connection;
    }

    getConnection(uid: string) {
        return this.connectionUidMap[ uid ];
    }

    connectionClosed(token: string, connection: Connection) {
        if (this.closedConnection[ token ]) return;
        const closedCon = Pool.get(PoolKey.ClosedConnection, ClosedConnection);
        closedCon.time = Date.now();
        closedCon.connection = connection;

        this.closedConnection[ token ] = closedCon;

        delete this.connectionUidMap[ token ];
    }

    getClosedConnection(token: string) {
        const closedCon = this.closedConnection[ token ];
        if (closedCon) {
            const con = closedCon.connection;
            closedCon.time = 0;
            closedCon.connection = null;
            Pool.recover(PoolKey.ClosedConnection, closedCon);
            delete this.closedConnection[ token ];
            return con;
        }
        return null;
    }

    private clearClosedConnection() {
        const time = Date.now();
        const { closedConnection, ClosedConExistTime } = this;
        Object.keys(closedConnection).forEach(v => {
            const con = closedConnection[ v ];
            if (time - con.time > ClosedConExistTime) {
                con.connection.clear();
                Pool.recover(PoolKey.ClosedConnection, con);
                delete closedConnection[ v ];
            }
        });
    }
}

export const connectionMgr = new ConnectionMgr();