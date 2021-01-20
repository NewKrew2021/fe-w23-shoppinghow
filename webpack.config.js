const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './public/app.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: './view/index.html'
    }
  ), new MiniCssExtractPlugin()]
};