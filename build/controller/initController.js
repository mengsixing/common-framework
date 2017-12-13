'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require('./indexController.js');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InitController {
    init(app, router) {
        app.use(router(_ => {
            _.get('/', async (ctx, next) => {
                var data = await new _indexController2.default().getIndexInfo();
                ctx.body = await ctx.render('index', { data: data });
            }), _.get('/user', (ctx, next) => {
                ctx.body = 123;
            });
        }));
    }
}

exports.default = InitController;