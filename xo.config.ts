import {type FlatXoConfig} from 'xo';

const xoConfig: FlatXoConfig = [
	{ignores: ['plop-templates']},
	{
		prettier: 'compat',
		rules: {
			'n/file-extension-in-import': 'off',
		},
	},
];

export default xoConfig;
