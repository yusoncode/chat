var path = require('path');
var log4js = require('log4js');
var fs = require('fs');

var env = process.env.NODE_ENV || 'local';
var filepath = path.join(__dirname, '../logs');
var level = 'DEBUG';
var projectName = 'shanpai';

if (env == 'production') {
    level = 'INFO';
    filepath = '/mydata/logs/' + projectName;

}
if (env == 'test') {
    level = 'INFO';
    filepath = '/mydata/logs/' + projectName;
}
if (env == 'dev') {
    level = 'DEBUG';
    filepath = '/mydata/logs/' + projectName;
}

var folder_exists = fs.existsSync(filepath);
if (!folder_exists) {
    fs.mkdir(filepath, function (err) {
    });
}

log4js.configure({
    appenders: [
        {type: 'console'},
        {
            type: 'dateFile',
            filename: filepath,
            pattern: '/yyyyMMdd-hh.log',
            absolute: true,
            alwaysIncludePattern: true,
            category: 'fileLog'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('fileLog');
logger.setLevel(level);
exports.logger = logger;
