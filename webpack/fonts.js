module.exports = function() {
	return {
		module: {
			rules: [
				{
					test: /\.(otf|ttf|eot|woff|woff2)$/,
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]'
					}
				}
			]
		}
	}
}