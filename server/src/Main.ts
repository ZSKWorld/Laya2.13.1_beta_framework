import * as http from "http";
import { AddressInfo } from "net";
import * as websocket from "websocket";
import { Connection } from "./core/Connection";
import { cfgMgr } from "./core/config/CfgManager";
import { Timer } from "./libs/Timer";
import { Color, Logger } from "./utils/Logger";
require("../libs/extends.js");
cfgMgr.load();
Logger.setEnable(true);
const originConOnMessage = function (connection: websocket.connection, msg: websocket.Message) {
    if (msg.type === 'utf8') {
        const input: IUserInput = JSON.parse(msg.utf8Data);
        Connection.startConnection(input, connection, msg);
    } else {
        connection.removeAllListeners("message");
        connection.close();
    }
}

const httpServer = http.createServer().listen({ host: "192.168.71.9", port: 8007 }, function () {
    const { address, port } = httpServer.address() as AddressInfo;
    Logger.log(`服务器已启动：${ address }:${ port }`, Color.green);
});

const wsServer = new websocket.server({ httpServer });

wsServer.on("request", (request: websocket.request) => {
    const connection = request.accept();
    Logger.log(`${ connection.remoteAddress }:${ connection.socket.remotePort } 已连接，连接数量：${ wsServer.connections.length }`, Color.green);

    connection.on("message", (msg) => originConOnMessage(connection, msg));
});

wsServer.on("connect", (connection: websocket.connection) => { });

wsServer.on("close", (connection, reson, desc) => {
    Logger.log(`${ connection.remoteAddress }:${ connection.socket.remotePort } 断开连接，剩余连接数量：${ wsServer.connections.length }。${ reson }-${ desc }`, Color.red);
});

setInterval(() => {
    Timer.timer["_update"]();
}, 1000 / 60);

export function broadcastAll(msg: IUserInput) {
    wsServer.broadcastUTF(JSON.stringify(msg));
}