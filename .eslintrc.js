/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2020: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		// @typescript-eslint rules
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/explicit-member-accessibility': 'warn',
		'@typescript-eslint/no-invalid-void-type': 'error',
		'@typescript-eslint/no-require-imports': 'warn',
		'@typescript-eslint/ban-ts-comment': 'off', // override recommended
		'@typescript-eslint/no-non-null-assertion': 'off' // override recommended
	}
};
