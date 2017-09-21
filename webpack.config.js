const path = require('path');
const HtmlWebpacPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge(
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			'blog': PATHS.source + '/pages/blog/blog.js'
		},
		output: {
			path: PATHS.build,
			filename: '[name].js'
		},
		plugins: [
			new HtmlWebpacPlugin({
				filename: 'index.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/index/index.pug',
			}),
			new HtmlWebpacPlugin({
				filename: 'blog.html',
				chunks: ['blog'],
				template: PATHS.source + '/pages/blog/blog.pug',
			})
		]
	},
	pug()
);

module.exports = function(env) {
	if(env === 'prod') {
		return common;
	}
	if (env === 'dev') {
		return merge([
			common,
			devserver(),
			sass(),
			css()
		])
	}
};