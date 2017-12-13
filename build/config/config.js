'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//这里是公共配置
let config = {};

if (process.env.NODE_ENV == 'production') {
	Object.assign(config, _server2.default);
} else {
	Object.assign(config, _local2.default);
}

exports.default = config;