const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const banner = require('./banner');

module.exports = env => {
  return {
    mode: env.mode,
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        templateParameters: {
          env: env.mode === 'development' ? '(개발용)' : '', 
        },
      }),
      new webpack.BannerPlugin(banner),
      new CleanWebpackPlugin()
    ]
  }
};
