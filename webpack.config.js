const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const MODE = "development";
const ENTRY_FILE = "./public/js/main.js";
const OUTPUT_DIR = path.resolve(__dirname, "public/dist");

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        ENTRY_FILE
    ],
    mode: MODE,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/, 
            use: ['style-loader', 'css-loader']
        }]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'view/index.html' }),

        // hot-middleware
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

};