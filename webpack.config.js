const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};
	if (!isDev) {
		config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
	}
	return config;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		index: './index.js',
		page: './js/page.js',
		comments: './js/comments.js',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			inject: true,
			filename: 'index.html',
			chunks: ['index'],
			minify: {
				collapseWhitespace: !isDev,
			},
		}),
		new HTMLWebpackPlugin({
			template: './page.html',
			inject: true,
			chunks: ['page'],
			filename: 'page.html',
			minify: {
				collapseWhitespace: !isDev,
			},
		}),
		new HTMLWebpackPlugin({
			template: './comments.html',
			inject: true,
			chunks: ['comments'],
			filename: 'comments.html',
			minify: {
				collapseWhitespace: !isDev,
			},
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: 'assets',
					to: 'assets',
				},
			],
		}),
		new MiniCssExtractPlugin({ filename: filename('css') }),
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.s[sc]ss$/,
				use: [MiniCssExtractPlugin.loader, 'sass-loader'],
			},
		],
	},
};
