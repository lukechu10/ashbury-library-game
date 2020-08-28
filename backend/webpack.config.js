/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: {
		index: './src/index.ts'
	},
	devtool: 'eval-cheap-module-source-map',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
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
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin()
	],
	target: 'node'
};