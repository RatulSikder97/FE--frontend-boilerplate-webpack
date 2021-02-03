const paths = require("./paths");
const { merge } = require("webpack-merge");
const webpackConfig = require("../webpack.config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(webpackConfig, {
	mode: "production",
	devtool: false,
	output: {
		path: paths.build,
		publicPath: "/",
		filename: "js/[name].min.js",
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: true,
						},
					},
					"postcss-loader",
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		// Extracts CSS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		new MiniCssExtractPlugin({
			filename: "styles/[name].min.css",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), "..."],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
