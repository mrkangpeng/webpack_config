/*
 * @Description: 
 * @Autor: kangpeng
 * @Date: 2020-01-14 14:54:42
 * @LastEditors  : kangpeng
 * @LastEditTime : 2020-01-17 16:10:36
 */
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动引入js文件到index.html中
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 每次打包前清除上次打包的文件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 拆分css样式到单独文件
const extractCss = new ExtractTextPlugin('index.css');
const extractStylus = new ExtractTextPlugin('index.styl');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development', // 开发模式
    entry: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')], // 入口文件
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名称
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        extractCss,
        extractStylus,
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }] // 从右向左解析原则
            },
            {
                test: /\.styl$/,
                use: ['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }, 'stylus-loader']
            },
            {
                test:/\.scss$/,
                use:['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }, 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i, // 图片文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue'],
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
}