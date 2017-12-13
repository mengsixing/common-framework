//html-webpack-plugin 自定义plugin
function htmlAfterWebpackPlugin(options) {
    // Configure your plugin with options... 
  }
   
  htmlAfterWebpackPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {

      compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        console.log('dada是：',htmlPluginData);
        var alljs=htmlPluginData.assets.js;
        var allCss=htmlPluginData.assets.css;
        var result=htmlPluginData.html;
        result=result.replace('{{js}}','<script src="'+alljs+'" ></script> ');
        result=result.replace('{{css}}','<link href="'+allCss+'" rel="stylesheet"  /> ');

        htmlPluginData.html = result;
        callback(null, htmlPluginData);
      });
      
    });
   
  };
   
  module.exports = htmlAfterWebpackPlugin;