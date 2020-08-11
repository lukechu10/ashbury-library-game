/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

function HtmlTemplateFactory(templatePath) {
	return new HtmlWebpackPlugin({
		inject: 'head',
		template: path.join(__dirname, templatePath),
		filename: path.parse(templatePath).name + '.html'
	});
}

module.exports = {
	context: __dirname,
	entry: [
		'./src/index.ts'
	],
	devtool: 'eval-cheap-module-source-map',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
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
		...[
			'src/views/index.pug',
			'src/views/routes/game-selection.pug'
		].map(
			path => HtmlTemplateFactory(path)
		),
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
		allowedHosts: ['localhost', '.gitpod.io'],
		liveReload: true
	}
};