const app=require('../build/app.js');
const devConfig=require('../build/config/config').default;
const opn = require('opn');

console.log('这是app的端口：',devConfig);
app.listen();
opn('http://localhost:'+devConfig.port);
