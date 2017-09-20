const path = require('path');
const HtmlWebpacPlugin = require('html-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

module.exports = {
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
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			}
		]
	}
};