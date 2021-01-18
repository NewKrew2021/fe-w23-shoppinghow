const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './public/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
          loader : 'babel-loader'
        }
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test: /\.(png|jpg|ico)$/,
				use: [
					'file-loader?name=img/[name].[ext]?[hash]',
					'image-webpack-loader'
			],
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
		 template: './public/index.html'
		})
	],
	devServer: {
		contentBase: './dist',
	}
};
