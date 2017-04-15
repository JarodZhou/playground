var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var webpack = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        vendors: ['jquery','moment']
    }, 

    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        proxy: {
          '/api/*': {
              target: 'https://www.baidu.com',
              secure: false
          }
        }
    },

    module: {
/*
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            }],
*/
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename:'vendors.js' }),

        new HtmlwebpackPlugin({
            title: 'Hello World app'
        })
    ]
};