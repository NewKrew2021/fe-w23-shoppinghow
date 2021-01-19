const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
        {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/}, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      }
    ]
  },
  devServer: {
    contentBase: 'public/dist',
  },
  plugins: [new HtmlWebpackPlugin({
      template: '/view/index.html'
    })]
}