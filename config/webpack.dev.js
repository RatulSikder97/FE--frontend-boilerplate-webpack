/** @format */

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = require("../webpack.config");
const paths = require("./paths");

module.exports = merge(webpackConfig, {
	// set development mode
	mode: "development",

	// Control how source maps are generated
	devtool: "inline-source-map",

	// output
	output: {
		filename: "[name].bundle.js",
		path: paths.build,
	},
	// setup server
	devServer: {
		contentBase: paths.build,
		watchContentBase: true,
		publicPath: "/",
		open: true,
		historyApiFallback: true,
		compress: true,
		overlay: true,
		hot: false,
		watchOptions: {
			poll: 300,
		},
		host: "localhost",
		port: 8080,
	},
	/* File watcher options */
	watchOptions: {
		aggregateTimeout: 300,
		poll: 300,
		ignored: /node_modules/,
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},

	plugins: [
		new HTMLWebpackPlugin({
			title: "webpack Boilerplate",
			template: paths.src + "/template.html", // template file
		}),
	],
});
