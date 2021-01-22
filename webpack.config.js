const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './webpack-entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.bundle.js'
  },
  module: {
    rules: [

      // rule for js
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.25%, not dead',
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                    proposals: true
                  },
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-transform-modules-commonjs',
            ]
          }
        }
      },

      // rule for css
      {
        test: /\.s[ac]ss$/i,
        use: [
          // extracts CSS into separate files
          MiniCssExtractPlugin.loader,
          // inject CSS into the DOM
          // { loader: 'style-loader' },
          // interprets @import and url() like import/require() and will resolve them
          {
            loader: 'css-loader',
            options: {
              modules: { // enable CSS modules and their configuration
              localIdentName:'[local]'
              }
            }
          },
          // loads a Sass/SCSS file and compiles it to CSS
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  mode: 'development'
};