'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class IndexModel {
    getIndexInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('这是首页信息。zz');
            }, 1000);
        });
    }
}

exports.default = IndexModel;