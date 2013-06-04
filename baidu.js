var settings = require('./examples/settings');

settings.hostname = 'doubannode.duapp.com';
settings.serverPort = process.env.APP_PORT;


var db_name = 'jpyMEvkVvrgATYOVowzO';                  // 数据库名，从云平台获取
var db_host = process.env.BAE_ENV_ADDR_MONGO_IP;     // 数据库地址
var db_port = +process.env.BAE_ENV_ADDR_MONGO_PORT;  // 数据库端口
var username = process.env.BAE_ENV_AK;                // 用户名
var password = process.env.BAE_ENV_SK;                // 密码

settings.dbUrl = 'mongodb://' + username + ':' + password + '@' + db_host + ':' + db_port + '/' + db_name;

var app = require('./examples/app').start();