const nodejsWebsocket = require("nodejs-websocket");//websocket
var HashMap = require('hashmap');
var UUID = require('node-uuid');
var logger = require('./utils/LoggerUtil').logger;
var dateUtil = require('./utils/DateUtil');
var commonUtil = require('./utils/CommonUtil');
var userConnectionMap = new HashMap();//用户，连接映射
var connectionUserMap = new HashMap();//连接，用户映射
var userIdMap = new HashMap();//用戶ID，映射

//创建一个服务
const server = nodejsWebsocket.createServer(function (conn) {
        logger.info("New connection 客户端练连接数量：" + server.socket._connections);

        // 客户端有消息的时候的回到函数
        var userName = decodeURI(conn.path.split("=")[1]);//把地址栏中文解码
        var uuid = UUID.v1();//用户唯一标识

        var userId = randomUserId(userIdMap);
        userIdMap.set(userId, userName);
        userConnectionMap.set(userId, conn);
        connectionUserMap.set(conn, userId);




        console.warn(userIdMap);
        console.warn(userConnectionMap);
        console.warn(connectionUserMap);

        conn.on("text", function (str) {
            // 接收到客户端的消息时的处理
            logger.info("内容：" + str);
            str = JSON.parse(str);
            var data = {
                userId: connectionUserMap.get(conn),
                userName: userIdMap.get(connectionUserMap.get(conn)),
                type: 1,
                content: str.content,
                timeStr: dateUtil.formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss'),
                connNums: server.connections.length,
                userArray: broadcastUserArray()
            };

            broadcast(JSON.stringify(data));
        });

        conn.on("close", function (code, reason) {
            logger.info("客户端练连接数量：" + server.socket._connections);
            logger.error("closed：" + " code = " + code + ";reason：" + reason);
            //发送消息 {"userId":XXX,"userName":XXX,"type":0,"content":XXX,"timeStr":XXX}
            var data = {
                userId: connectionUserMap.get(conn),
                userName: userIdMap.get(connectionUserMap.get(conn)),
                type: 2,
                content: connectionUserMap.get(conn) + "，已掉线",
                timeStr: dateUtil.formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss'),
                connNums: server.connections.length,
                userArray: broadcastUserArray()
            };

            broadcast(JSON.stringify(data));
            //移除用户ID
            userIdMap.delete(connectionUserMap.get(conn));
            //移除当前用户连接
            userConnectionMap.delete(connectionUserMap.get(conn));
            //移除当前连接用户
            connectionUserMap.delete(conn);

            // console.warn(userIdMap);
            // console.warn(userConnectionMap);
            // console.warn(connectionUserMap);
        });

        conn.on("error", function (err) {
            logger.info("客户端练连接数量：" + server.socket._connections);
            logger.error('err：' + err);
            //移除用户ID
            userIdMap.delete(connectionUserMap.get(conn));
            //移除当前用户连接
            userConnectionMap.delete(connectionUserMap.get(conn));
            //移除当前连接用户
            connectionUserMap.delete(conn);
        });

    })
;

function broadcast(str) {
    // 取到server下面的所有连接
    logger.info("客户端练连接数量：" + server.socket._connections);
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    });
}

function broadcastUserArray() {
    var userArray = [];
    for (var i = 0; i < server.connections.length; i++) {
        var conn = server.connections[i];
        userArray.push({
            userId: connectionUserMap.get(conn),
            userName: userIdMap.get(connectionUserMap.get(conn))
        });
    }
    return userArray;
}

/**
 * 随机生成不重复的用户ID
 * @param userIdMap
 * @returns {number}
 */
function randomUserId(userIdMap){
    var userIdNew = Math.floor(Math.random() * 999999999 + 1000000000);//重复，则递归
    if(userIdMap.has(userIdNew)){
        return randomUserId(userIdMap);
    }
    return userIdNew;
}
module.exports = server;
