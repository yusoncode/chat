var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('./utils/LoggerUtil').logger;
var config = require('./config');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
