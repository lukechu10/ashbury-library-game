/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require('path');

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
	target: 'node'
};