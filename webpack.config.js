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
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge(
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			'home': PATHS.source + '/pages/home/home.js',
			'tariffs': PATHS.source + '/pages/tariffs/tariffs.js',
			'comments': PATHS.source + '/pages/comments/comments.js'
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
				filename: 'tariffs.html',
				chunks: ['tariffs', 'common'],
				template: PATHS.source + '/pages/tariffs/tariffs.pug',
			}),
			new HtmlWebpacPlugin({
				filename: 'comments.html',
				chunks: ['comments', 'common'],
				template: PATHS.source + '/pages/comments/comments.pug',
			}),
			new HtmlWebpacPlugin({
				filename: 'home.html',
				chunks: ['home', 'common'],
				template: PATHS.source + '/pages/home/home.pug',
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
	pug(),
	images(),
	fonts()
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