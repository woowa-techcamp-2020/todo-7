const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: '',
      },
      hash: true,
    }),
    new webpack.BannerPlugin({
      banner: () => {
        const commit = childProcess.execSync('git rev-parse --short HEAD');
        const user = childProcess.execSync('git config user.name');
        const date = new Date().toLocaleString();

        return `commitVersion: ${commit}` + `Build Date: ${date}\n` + `Author: ${user}`;
      },
    }),
  ],
  optimization: {
    usedExports: true,
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
};
