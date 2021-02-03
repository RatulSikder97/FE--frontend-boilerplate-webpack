/** @format */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
//const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "./src/js/app.js"),
	},

	output: {
		path: path.resolve(__dirname, "./dist/"),
		filename: "js/[name].js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			// Images
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: "asset/resource",
			},
			// Fonts and SVGs
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline",
			},
			// CSS, PostCSS, and Sass
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
		],
	},
	// devServer: {
	// 	contentBase: path.join(__dirname, "dist"),
	// 	compress: true,
	// 	port: 9000,
	// },

	plugins: [
		new HTMLWebpackPlugin({
			title: "webpack Boilerplate",
			template: path.resolve(__dirname, "./src/template.html"), // template file
			filename: "index.html", // output file
		}),
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve("src/img/"),
					to: path.resolve("dist/img"),
					toType: "dir",
					globOptions: {
						ignore: ["*.DS_Store", "Thumbs.db"],
					},
				},
			],
		}),
		new CleanWebpackPlugin(),
	],
};