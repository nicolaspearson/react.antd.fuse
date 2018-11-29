const fs = require('fs');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
	throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const resolveApp = (relativePath: string) =>
	path.resolve(fs.realpathSync(process.cwd()), relativePath);
const dotenv = resolveApp('.env');

var dotenvFiles = [
	`${dotenv}.${NODE_ENV}.local`,
	`${dotenv}.${NODE_ENV}`,
	// Don't include `.env.local` for `test` environment
	// since normally you expect tests to produce the same
	// results for everyone
	NODE_ENV !== 'test' && `${dotenv}.local`,
	dotenv
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set. Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
	if (fs.existsSync(dotenvFile)) {
		require('dotenv-expand')(
			require('dotenv').config({
				path: dotenvFile
			})
		);
	}
});

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

export function getClientEnvironment() {
	const raw = Object.keys(process.env)
		.filter((key) => REACT_APP.test(key))
		.reduce(
			(env, key) => {
				env[key] = process.env[key];
				return env;
			},
			{
				// Useful for determining whether we’re running in production mode.
				// Most importantly, it switches React into the correct mode.
				NODE_ENV: process.env.NODE_ENV || 'development'
			}
		);
	// Stringify all values
	const stringified = {
		'process.env': Object.keys(raw).reduce((env, key) => {
			env[key] = JSON.stringify(raw[key]);
			return env;
		}, {})
	};

	return { raw, stringified };
}
