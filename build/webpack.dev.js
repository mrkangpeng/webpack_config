/*
 * @Description: webpack.dev.js
 * @Autor: kangpeng
 * @Date: 2020-01-17 13:49:08
 * @LastEditors  : kangpeng
 * @LastEditTime : 2020-01-17 14:47:23
 */
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(webpackConfig,{
    mode:"development",
    devtool:'cheap-module-eval-source-map',
    devServer:{
        port:3000,
        hot:true,
        contentBase:'../dist'
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})