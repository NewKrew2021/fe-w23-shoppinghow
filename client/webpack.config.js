const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "./app.js",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        fallback: {
            fs: false,
            buffer: false,
            http: false,
            net: false,
            crypto: false,
            zlib: false,
        },
    },
    devServer: {
        contentBase: __dirname + "/dist/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },      
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'views/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}

