const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map', // 디버깅을 위한 소스맵
    mode: "development",
    entry: "./public/js/app.js", // 엔트리 포인트
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
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
                use: ['css-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.html'
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: "./public/stylesheets",
                    to: "stylesheets"
                },{
                    from: "./public/images",
                    to: "images"
                }
            ],
        })
    ],
    devServer: {
        contentBase: __dirname + "/dist/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 9000
    }
}