const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.conf.js')
var htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const viewsPath = path.join(__dirname, '../src/web/views/');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');



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
    //js hint
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   //true
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //     //baidu 万万不能要
    //     drop_console: true,
    //     collapse_vars: true,
    //     reduce_vars: true
    //   }
    // }),
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
    new HtmlWebpackPlugin({
      filename: '../widget/myheader.html',
      template: 'src/web/widget/myheader/myheader.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: '../widget/myfooter.html',
      template: 'src/web/widget/myfooter/myfooter.html',
      inject: false
    }),

    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "production")
    }),
    new htmlAfterWebpackPlugin({})
  ]
};

var WebpackConfig = Object.assign(baseConfig, devConfig);

module.exports = WebpackConfig;