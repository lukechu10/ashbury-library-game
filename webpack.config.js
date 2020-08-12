/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function HtmlTemplateFactory(templatePath, chunks) {
	return new HtmlWebpackPlugin({
		inject: 'head',
		template: path.join(__dirname, templatePath),
		filename: path.parse(templatePath).name + '.html',
		chunks: [...chunks, 'global'] // add 'global' chunk to all views
	});
}

module.exports = {
	context: __dirname,
	entry: {
		global: './src/global.ts', // included in all views
		main: './src/scripts/index.ts', // index.html
		gameSelection: './src/scripts/GameSelection.ts' // game-selection.html
	},
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/styles/'
						}
					},
					'css-loader',
					'sass-loader'
				],
			}
		]
	},
	plugins: [
		...[
			{
				templatePath: 'src/views/index.pug',
				chunks: ['main']
			},
			{
				templatePath: 'src/views/routes/game-selection.pug',
				chunks: ['gameSelection']
			}
		].map(
			view => HtmlTemplateFactory(view.templatePath, view.chunks)
		),
		new ForkTsCheckerWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'src/images', to: 'images' }
			]
		}),
		new MiniCssExtractPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		host: '0.0.0.0',
		allowedHosts: ['localhost', '.gitpod.io'],
		liveReload: true,
		transportMode: 'ws'
	}
};