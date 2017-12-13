const path = require('path')
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const baseConfig= require('./webpack.conf.js')
var htmlAfterWebpackPlugin=require('./htmlAfterWebpackPlugin');

const viewsPath=path.join(__dirname,'../src/web/views/');


const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');



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

//把web views下的所有html打包到build

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
    new HtmlWebpackPlugin({
      template:viewsPath+'index/pages/index.html',
      filename: '../views/index.html',
      inject:false 
    }),
    new HtmlWebpackPlugin({
      filename: '../views/layout.html',
      template:viewsPath+'common/pages/layout.html',
      inject:false
    }),
    new HtmlWebpackPlugin({
      filename: '../widget/myheader.html',
      template:'src/web/widget/myheader/myheader.html',
      inject:false
    }),
    new HtmlWebpackPlugin({
      filename: '../widget/myfooter.html',
      template: 'src/web/widget/myfooter/myfooter.html',
      inject: false
  }),
    new htmlAfterWebpackPlugin({}),
    new ExtractTextPlugin("styles/[name].css"),
    new CleanWebpackPlugin(pathsToClean ,cleanOptions)
  ]
};

var WebpackConfig =Object.assign( baseConfig,devConfig);

module.exports = WebpackConfig;