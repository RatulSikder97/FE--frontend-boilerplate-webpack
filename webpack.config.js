/** @format */
// import paths object from config
const paths = require("./config/paths");

module.exports = {
	entry: {
		// app: path.resolve(__dirname, "./src/js/app.js"),
		app: paths.src + "/js/app.js",
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"],
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "img",
					},
				},
			},

			// Fonts and SVGs
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline",
			},
		],
	},
};
