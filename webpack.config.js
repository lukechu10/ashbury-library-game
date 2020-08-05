const path = require('path');

const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: [
		'./src/index.ts'
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.pug$/i,
				loader: 'pug-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'head',
			template: path.join(__dirname, 'src/views/index.pug')
		}),
		new ForkTsCheckerWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'src/images', to: 'images' }
			]
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		host: '0.0.0.0',
		allowedHosts: ['localhost', '.gitpod.io']
	}
};