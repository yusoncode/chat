/**
 * Created by xiaoyu.li on 2018/10/17.
 */
var websocket = require('../nodejs-websocket');
var app = require('../app');
var config = require('../config');
var logger = require('../utils/LoggerUtil').logger;

var server_websocket = websocket.listen(config.common.PORT_WEBSOCKET, config.common.HOST, function () {
    logger.info('websocket server listening at http://%s:%s', config.common.HOST, config.common.PORT_WEBSOCKET);
});

var server_app = app.listen(config.common.PORT_APP, config.common.HOST, function () {
    logger.info('http server listening at http://%s:%s', server_app.address().address, server_app.address().port);
});