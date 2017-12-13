var path= require('path');
var fs = require("fs");
const _ = require('lodash');

//循环读取页面入口文件
const viewsDir=path.join(__dirname,'../src/web/views');
const jsEntris = {};
fs.readdirSync(viewsDir).map((filename,index)=>{
	const _fd = viewsDir +"/" + filename;
	fs.readdirSync(_fd).map((innnero,ifile)=>{
		if(/.entry.js$/.test(innnero)){
			jsEntris[innnero.replace(".entry.js","")] = path.join(viewsDir,filename,innnero);
		} 
	})
});

//配置通用的loader

var _entry=Object.assign(jsEntris);

const _modules = {
	rules: [
        {
			test: /\.js$/,
			loader: "babel-loader",
			options: {
				"presets": [['env',{  
					"modules": false  
				  }]]
			}
		}
    ]
}

const _resolve = {
	extensions: [".js",".css"]
}

var _rules=_.clone(_modules.rules);

var webpackConfig={
    entry:jsEntris,
    module: {
        rules: _rules
      },
    resolve:_resolve
};

module.exports=webpackConfig;