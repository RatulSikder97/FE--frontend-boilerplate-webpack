/** @format */

const paths = require("./paths");
const { merge } = require("webpack-merge");
const webpackConfig = require("../webpack.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: paths.src + "/img",
		// 			to: paths.build + "/img",
		// 			toType: "dir",
		// 			globOptions: {
		// 				ignore: ["*.DS_Store", "Thumbs.db"],
		// 			},
		// 		},
		// 	],
		// }),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				// Lossless optimization with custom option
				// Feel free to experiment with options for better result for you
				plugins: [
					["gifsicle", { interlaced: true }],
					["jpegtran", { progressive: true }],
					["optipng", { optimizationLevel: 5 }],
					[
						"svgo",
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),

		new CleanWebpackPlugin(),
	],
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HTMLWebpackPlugin({
				title: "webpack Boilerplate",
				template: paths.src + "/template.html", // template file
				filename: "indexs.html", // output file
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
