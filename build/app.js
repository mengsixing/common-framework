'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _config = require('./config/config.js');

var _config2 = _interopRequireDefault(_config);

var _errorHander = require('./middlewares/errorHander.js');

var _errorHander2 = _interopRequireDefault(_errorHander);

var _initController = require('./controller/initController.js');

var _initController2 = _interopRequireDefault(_initController);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = new _koa2.default();
//配置静态资源路径
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
//配置koa-swig
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir
}));
//配置全局日志打印
_log4js2.default.configure({
  appenders: { globallog: { type: 'file', filename: './logs/globallog.log' } },
  categories: { default: { appenders: ['globallog'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('globallog');
//配置全局错误处理
new _errorHander2.default().init(app, logger);
//初始化路由
new _initController2.default().init(app, _koaSimpleRouter2.default);
app.listen(_config2.default.port);

module.exports = app;