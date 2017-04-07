var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: APP_PATH
            }
        ]
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Hello World app'
        })
    ]
};