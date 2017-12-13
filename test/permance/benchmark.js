//测试代码执行效率
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

// add tests 
suite.add('正则匹配', function() {
 /o/.test('Hello World!');
})
.add('字符串匹配', function() {
 'Hello World!'.indexOf('o') > -1;
})
// add listeners 
// 进行测试的过程中 打印测试的过程
.on('cycle', function(event) {
 console.log(String(event.target));
})

//取得测试结果
.on('complete', function() {
 console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async 
.run({ 'async': true });