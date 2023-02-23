"use strict";
exports.__esModule = true;
var ProxyMgr_1 = require("./core/user/ProxyMgr");
require("../libs/extends.js");
// Logger.setEnable(true);
// tableMgr.loadTable();
// const originConnection: { [ key: string ]: websocket.connection } = {};
// const originConOnMessage = function (conKey: string, msg: websocket.Message) {
//     const connect = originConnection[ conKey ];
//     delete originConnection[ conKey ];
//     if (msg.type === 'utf8') {
//         const data: UserInput = JSON.parse(msg.utf8Data);
//         Connection.startConnection(data.token, connect, msg);
//     } else connect.close();
// }
// const server = http.createServer().listen({ host: "192.168.0.101", port: 8003 }, function () {
//     const { address, port } = server.address() as AddressInfo;
//     Logger.log(`服务器已启动：${ address }:${ port }`, Color.green);
// });
// const wsServer = new websocket.server({ httpServer: server, autoAcceptConnections: false });
// wsServer.on("request", (request: websocket.request) => {
//     const connection = request.accept();
//     Logger.log(`${ connection.remoteAddress }:${ connection.socket.remotePort } 已连接，连接数量：${ wsServer.connections.length }`, Color.green);
//     const conKey = request.key;
//     originConnection[ conKey ] = connection;
//     connection.once("message", (msg) => originConOnMessage(conKey, msg));
//     connection.once("close", () => delete originConnection[ conKey ]);
// });
// // wsServer.on("connect", (connection: websocket.connection) => {});
// wsServer.on("close", (connection, reson, desc) => {
//     Logger.log(`${ connection.remoteAddress }:${ connection.socket.remotePort } 断开连接，剩余连接数量：${ wsServer.connections.length }。${ reson }-${ desc }`, Color.red);
// });
// export function broadcastAll(msg: UserInput) {
//     wsServer.broadcastUTF(JSON.stringify(msg));
// }
var a = ProxyMgr_1.ProxyMgr.getProxy("asdf", null, { b: [{ c: 1 }, { d: 2 }, { e: 3 }] });
a.b[0].c = 4;
console.log(333, a);
