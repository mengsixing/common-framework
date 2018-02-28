const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.conf.js')
var htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const viewsPath = path.join(__dirname, '../src/web/views/');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var fs = require("fs");

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



// the path(s) that should be cleaned
let pathsToClean = [
  'build'
]

// the clean options to use
let cleanOptions = {
  root: path.join(__dirname, '../'),
  verbose: true,
  dry: false
}

//把web views下的所有html打包到build

var devConfig = {
  output: {
    path: path.resolve(__dirname, '..', 'build/assets/'),
    publicPath: '/',
    filename: 'scripts/[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles/[name].[hash:5].css"),
    //scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: viewsPath + 'index/pages/index.html',
      filename: '../views/index.html',
      chunks:["index-index"],
      minify:{
          removeComments:true,
          collapseWhitespace:true
      },
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: '../views/layout.html',
      template: viewsPath + 'common/pages/layout.html',
      inject: false
    }),
    ...widgetHtmls,

    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "production")
    }),
    new htmlAfterWebpackPlugin({})
  ]
};

var WebpackConfig = Object.assign(baseConfig, devConfig);

module.exports = WebpackConfig;
