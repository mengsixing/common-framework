'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const devConfig = {
	port: 3000,
	"viewDir": _path2.default.join(__dirname, '..', 'views'),
	"staticDir": _path2.default.join(__dirname, '..', 'assets')
};

exports.default = devConfig;