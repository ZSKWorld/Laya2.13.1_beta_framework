import { Connection } from "./Connection";

class ConnectionMgr {
    private connectionUidMap: { [ uid: string ]: Connection } = {};
    private connectionAccMap: { [ account: string ]: Connection } = {};
    addConnection(uid: string, account: string, connection: Connection) {
        this.connectionUidMap[ uid ] = connection;
        this.connectionAccMap[ account ] = connection;
    }

    removeConnectionByUid(uid: string) {
        const connection = this.connectionUidMap[ uid ];
        delete this.connectionUidMap[ uid ];
        for (const key in this.connectionAccMap) {
            const element = this.connectionAccMap[ key ];
            if (element == connection) {
                delete this.connectionAccMap[ key ];
                return;
            }
        }
    }

    removeConnectionByAcc(account: string) {
        const connection = this.connectionAccMap[ account ];
        delete this.connectionAccMap[ account ];
        for (const key in this.connectionUidMap) {
            const element = this.connectionUidMap[ key ];
            if (element == connection) {
                delete this.connectionUidMap[ key ];
                return;
            }
        }
    }

    getConnectionByUid(uid: string): Connection {
        return this.connectionUidMap[ uid ];
    }

    getConnectionByAcc(account: string): Connection {
        return this.connectionAccMap[ account ];
    }
}

export const connectionMgr = new ConnectionMgr();