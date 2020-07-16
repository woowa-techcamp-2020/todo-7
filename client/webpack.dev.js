const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
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
  },
});