import tseslint from 'typescript-eslint';
import base from '@navio-dk/dev-env/eslint/typescript';

export default tseslint.config(
	{
		ignores: [ 'CHANGELOG.md' ]
	},
	base,
);