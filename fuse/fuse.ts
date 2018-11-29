import { exec } from 'child_process';
import * as fs from 'fs';
import {
	CopyPlugin,
	CSSPlugin,
	EnvPlugin,
	FuseBox,
	ImageBase64Plugin,
	JSONPlugin,
	LESSPlugin as FuseLESSPlugin,
	QuantumPlugin,
	Sparky,
	SVGPlugin,
	WebIndexPlugin
} from 'fuse-box';
import { TypeChecker } from 'fuse-box-typechecker';
import * as path from 'path';

const lessToJs = require('less-vars-to-js');

const LESSPlugin: any = FuseLESSPlugin;

import { getClientEnvironment } from './env';

// Configure the environment
const env = getClientEnvironment();
const isProduction = process.env.NODE_ENV === 'production';

// Configure directories
const root = path.resolve(__dirname, '../');
const directory = {
	node_modules: path.join(root, 'node_modules'),
	build: path.join(root, 'build'),
	cache: path.join(root, '.fusebox'),
	public: path.join(root, 'public'),
	src: path.join(root, 'src'),
	raw: path.join(root, 'src', 'utils', 'raw'),
	assets: path.join(root, 'src', 'assets'),
	theme: path.join(root, 'src', 'theme'),
	applied_theme: path.join(root, 'src', 'theme', 'styles', 'kraken')
};

// Set the Ant Design variables
const antdThemeVariables = lessToJs(
	fs.readFileSync(path.join(directory.applied_theme, 'app-theme.less'), 'utf8')
);
antdThemeVariables['@icon-url'] = '"~antd-iconfont/iconfont"';
fs.writeFileSync(path.join(directory.raw, 'palette.json'), JSON.stringify(antdThemeVariables));

// Configure type checker
const tsConfigPath = path.join(directory.src, 'tsconfig.json');
const tsLintPath = path.join(directory.src, 'tslint.json');
const typechecker = TypeChecker({
	name: 'app',
	tsConfig: tsConfigPath,
	basePath: directory.src,
	tsLint: tsLintPath,
	yellowOnLint: true,
	shortenFilenames: true
});
const runSyncTypeChecker = () => {
	console.log(`\x1b[36m%s\x1b[0m`, `prod app bundled - running type check`);
	typechecker.runSync();
};

if (!isProduction) {
	// Create thread
	typechecker.startTreadAndWait();
}
const runThreadTypeChecker = () => {
	console.log(`\x1b[36m%s\x1b[0m`, `dev app bundled - running type check`);
	// Use thread, tell it to typecheck and print result
	typechecker.useThreadAndTypecheck();
};

// Re-usable style plugins
const lessRegex = /\.less$/;
const stylePlugins = [
	lessRegex,
	LESSPlugin({
		paths: ['node_modules/antd', `${directory.applied_theme}`, `${directory.src}`],
		javascriptEnabled: true
	}),
	CSSPlugin()
];

// Generic fuse configuration
function getConfig() {
	const plugins: any[] = [
		JSONPlugin(),
		EnvPlugin(env.raw),
		WebIndexPlugin({
			target: `index.html`,
			template: `${directory.public}/index.html`,
			path: '/'
		}),
		ImageBase64Plugin({
			useDefault: true
		}),
		SVGPlugin(),
		CopyPlugin({
			files: ['*.png', '*.jpg', '*.svg', '*.html'],
			dest: 'public'
		})
	];

	if (isProduction) {
		plugins.push(
			QuantumPlugin({
				bakeApiIntoBundle: 'app',
				polyfills: ['Promise'],
				target: 'browser',
				replaceTypeOf: false,
				treeshake: true,
				uglify: true
			})
		);
	}

	return FuseBox.init({
		homeDir: directory.src,
		sourceMaps: !isProduction,
		debug: !isProduction,
		log: {
			showBundledFiles: false, // Don't list all the bundled files every time we bundle
			clearTerminalOnBundle: true // Clear the terminal window every time we bundle
		},
		cache: !isProduction,
		target: 'browser',
		output: `${directory.build}/$name.js`,
		hash: isProduction,
		useJsNext: ['antd'],
		allowSyntheticDefaultImports: true,
		useTypescriptCompiler: true,
		plugins,
		alias: {
			app: directory.src
		}
	});
}

// Clean the build directory
Sparky.task('clean', [], async () => {
	await Sparky.src(`${directory.cache}`)
		.clean(`${directory.cache}`)
		.exec();

	return await Sparky.src(`${directory.build}`)
		.clean(`${directory.build}`)
		.exec();
});

// Copy static content / assets
Sparky.task('copy', [], async () => {
	return new Promise((resolve, reject) => {
		exec(`cp -r ${directory.assets} ${directory.build}`, (err, stdout, stderr) => {
			resolve();
		});

		exec(`cp -r ${directory.public}/* ${directory.build}`, (err, stdout, stderr) => {
			resolve();
		});
	});
});

Sparky.task('production', [], async () => {
	const fuseInstance = getConfig();
	fuseInstance
		.bundle('app')
		.tsConfig(tsConfigPath)
		.target('browser')
		.plugin([...stylePlugins])
		.completed(() => {
			runSyncTypeChecker();
		})
		.splitConfig({ dest: '/chunks/' })
		.instructions(`> index.tsx`);
	return await fuseInstance.run();
});

Sparky.task('development', [], async () => {
	const fuseInstance = getConfig();
	fuseInstance.dev({ fallback: 'index.html' });
	fuseInstance
		.bundle('app')
		.tsConfig(tsConfigPath)
		.target('browser')
		.plugin([...stylePlugins])
		.completed(() => {
			runThreadTypeChecker();
		})
		.watch()
		.instructions(`> index.tsx`)
		.hmr();
	return await fuseInstance.run();
});

Sparky.task('build', ['clean', 'copy', 'production'], () => {
	return;
});
Sparky.task('default', ['clean', 'copy', 'development'], () => {
	return;
});
