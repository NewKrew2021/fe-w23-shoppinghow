const path = require('path');

module.exports = {
  entry: './public/js',
  output: {
    path: path.resolve(__dirname, 'public/js/dist'),
    filename: 'script.bundle.js'
  },
  module: {
    rules: [
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
      }
    ]
  },
  mode: 'development'
};