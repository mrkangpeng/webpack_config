/*
 * @Description: webpack.prod.js
 * @Autor: kangpeng
 * @Date: 2020-01-17 13:49:22
 * @LastEditors  : kangpeng
 * @LastEditTime : 2020-01-17 14:22:38
 */
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const webpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = webpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-eval-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
        }])
    ],
    optimization: {
        minimize: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    }
})