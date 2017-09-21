const path = require('path');
const webpack = require('webpack');
const HtmlWebpacPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');

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
			filename: 'js/[name].js'
		},
		plugins: [
			new HtmlWebpacPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.source + '/pages/index/index.pug',
			}),
			new HtmlWebpacPlugin({
				filename: 'blog.html',
				chunks: ['blog', 'common'],
				template: PATHS.source + '/pages/blog/blog.pug',
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		]
	},
	pug()
);

module.exports = function(env) {
	if(env === 'prod') {
		return merge([
			common,
			extractCss(),
			uglifyJs()
		]);
	}
	if (env === 'dev') {
		return merge([
			common,
			devserver(),
			sass(),
			css()
		]);
	}
};