"use strict";
exports.__esModule = true;
exports.broadcastAll = void 0;
var http = require("http");
var websocket = require("websocket");
var Connection_1 = require("./core/Connection");
var TableManager_1 = require("./core/table/TableManager");
var Logger_1 = require("./utils/Logger");
require("../libs/extends.js");
Logger_1.Logger.setEnable(true);
TableManager_1.tableMgr.loadTable();
var originConnection = {};
var originConOnMessage = function (conKey, msg) {
    var connect = originConnection[conKey];
    delete originConnection[conKey];
    if (msg.type === 'utf8') {
        var data = JSON.parse(msg.utf8Data);
        Connection_1.Connection.startConnection(data.token, connect, msg);
    }
    else
        connect.close();
};
var server = http.createServer().listen({ host: "192.168.0.101", port: 8003 }, function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    Logger_1.Logger.log("\u670D\u52A1\u5668\u5DF2\u542F\u52A8\uFF1A".concat(address, ":").concat(port), "green" /* Color.green */);
});
var wsServer = new websocket.server({ httpServer: server, autoAcceptConnections: false });
wsServer.on("request", function (request) {
    var connection = request.accept();
    Logger_1.Logger.log("".concat(connection.remoteAddress, ":").concat(connection.socket.remotePort, " \u5DF2\u8FDE\u63A5\uFF0C\u8FDE\u63A5\u6570\u91CF\uFF1A").concat(wsServer.connections.length), "green" /* Color.green */);
    var conKey = request.key;
    originConnection[conKey] = connection;
    connection.once("message", function (msg) { return originConOnMessage(conKey, msg); });
    connection.once("close", function () { return delete originConnection[conKey]; });
});
// wsServer.on("connect", (connection: websocket.connection) => {});
wsServer.on("close", function (connection, reson, desc) {
    Logger_1.Logger.log("".concat(connection.remoteAddress, ":").concat(connection.socket.remotePort, " \u65AD\u5F00\u8FDE\u63A5\uFF0C\u5269\u4F59\u8FDE\u63A5\u6570\u91CF\uFF1A").concat(wsServer.connections.length, "\u3002").concat(reson, "-").concat(desc), "red" /* Color.red */);
});
function broadcastAll(msg) {
    wsServer.broadcastUTF(JSON.stringify(msg));
}
exports.broadcastAll = broadcastAll;
