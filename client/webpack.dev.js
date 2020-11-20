const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
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
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: () => {
        const commit = childProcess.execSync('git rev-parse --short HEAD');
        const user = childProcess.execSync('git config user.name');
        const date = new Date().toLocaleString();

        return `commitVersion: ${commit}` + `Build Date: ${date}\n` + `Author: ${user}`;
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: '(개발용)',
      },
      hash: true,
    }),
  ],
  devtool: 'eval-cheap-source-map',
  devServer: {
    overlay: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
