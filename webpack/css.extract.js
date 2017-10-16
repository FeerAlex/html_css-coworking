const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.scss$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loaderz',
								options: {
									// minimize: true || {/* CSSNano Options */},
									plugins: [
										autoprefixer({
											browsers: ['IE 10', 'IE 11', 'last 2 version']
										})
									]
								}
							},
							'sass-loader'
						]
					})
				},
				{
					test: /\.css$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('./css/[name].css')
		]
	}
}