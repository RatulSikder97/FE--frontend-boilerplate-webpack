const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackConfig = require("../webpack.config");
const paths = require("./paths");

module.exports = merge(webpackConfig, {
	// set development mode
	mode: "development",

	// Control how source maps are generated
	devtool: "inline-source-map",

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
	// module: {
	// 	rules: [
	// 		// Styles: Inject CSS into the head with source maps
	// 		{
	// 			test: /\.(scss|css)$/,
	// 			use: [
	// 				"style-loader",
	// 				{
	// 					loader: "css-loader",
	// 					options: { sourceMap: true, importLoaders: 1, modules: true },
	// 				},
	// 				{ loader: "postcss-loader", options: { sourceMap: true } },
	// 				{ loader: "sass-loader", options: { sourceMap: true } },
	// 			],
	// 		},
	// 	],
	// },

	// plugins: [
	// 	// Only update what has changed on hot reload
	// 	new webpack.HotModuleReplacementPlugin(),
	// ],
});
