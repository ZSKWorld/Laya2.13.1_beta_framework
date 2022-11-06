import * as http from "http";
import { AddressInfo } from "net";
import * as websocket from "websocket";
import { Connection } from "./core/Connection";
import { tableMgr } from "./core/table/TableManager";
import { Color, Logger } from "./utils/Logger";

Logger.setEnable(true);

tableMgr.loadTable();

const server = http.createServer(function (request, response) {
    response.writeHead(200);
    response.end();
}).listen({ host: "192.168.0.101", port: 8003 }, function () {
    const { address, family, port } = server.address() as AddressInfo;
    Logger.log(`服务器已启动：${ address },${ family },${ port }`, Color.green);
});

const wsServer = new websocket.server({ httpServer: server, autoAcceptConnections: false });

wsServer.on('request', function (request) {
    const connection = request.accept();
    //request.resourceURL
    Logger.log(`${ connection.remoteAddress }：通信已连接，连接数量：${ wsServer.connections.length }`, Color.green);
    new Connection(connection);
});

wsServer.on("connect", (connection) => {
    Logger.log("wsServer connect");
});

wsServer.on("close", (connection, reson, desc) => {
    Logger.log(`${ connection.remoteAddress }：断开连接。${ reson }-${ desc }`, Color.red);
    Logger.log(`剩余连接数量：${ wsServer.connections.length }`);
});