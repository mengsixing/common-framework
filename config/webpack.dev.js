const path = require('path')
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const baseConfig= require('./webpack.conf.js')
var htmlAfterWebpackPlugin=require('./htmlAfterWebpackPlugin');

const viewsPath=path.join(__dirname,'../src/web/views/');


const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var fs = require("fs");



// the path(s) that should be cleaned
let pathsToClean = [
  'build'
]
 
// the clean options to use
let cleanOptions = {
  root:     path.join(__dirname,'../'),
  verbose:  true,
  dry:      false
}

//把web widget下的所有html打包到widget
const widgetDir = path.join(__dirname, '../src/web/widget');
var widgetPages=[];
fs.readdirSync(widgetDir).map((filename) => {
  const _fd = widgetDir + "/" + filename;
  var viewUrl='src/web/widget' + "/" + filename;
	fs.readdirSync(_fd).map((innnero) => {
		if (/.html$/.test(innnero)) {
      widgetPages.push({
        filename:innnero,
        path:viewUrl+'/'+innnero
      });
		}
	})
});

var widgetHtmls= widgetPages.map((item)=>{
  return new HtmlWebpackPlugin({
    filename: '../widget/'+item.filename,
    template:item.path,
    inject:false
  })
})

//把web views下的所有html打包到widget
var viewPages=[];
fs.readdirSync(viewsPath).map((filename) => {
  const _fd = viewsPath + "/" + filename;
	fs.readdirSync(_fd).map((innnero) => {
		if (/.html$/.test(innnero)) {
      viewPages.push({
        filename:innnero,
        path:_fd+'/'+innnero
      });
		}
	})
});

var viewHtmls= widgetPages.map((item)=>{
  return new HtmlWebpackPlugin({
    filename: '../views/'+item.filename,
    template: item.path,
    inject:false
  })
})

var devConfig= {
  output: {
    path: path.resolve(__dirname, '..','build/assets/'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  module:{
    rules:[
      {
        test:/.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader"]
        })
      }
    ]
  },
  plugins: [
    //scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    ...viewHtmls,
    // new HtmlWebpackPlugin({
    //   template:viewsPath+'index/pages/index.html',
    //   filename: '../views/index.html',
    //   inject:false 
    // }),
    // new HtmlWebpackPlugin({
    //   filename: '../views/layout.html',
    //   template:viewsPath+'common/pages/layout.html',
    //   inject:false
    // }),
    ...widgetHtmls,
    new htmlAfterWebpackPlugin({}),
    new ExtractTextPlugin("styles/[name].css"),
    new CleanWebpackPlugin(pathsToClean ,cleanOptions)
  ]
};

var WebpackConfig =Object.assign( baseConfig,devConfig);

module.exports = WebpackConfig;
