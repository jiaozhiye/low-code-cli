/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-16 21:54:09
 */
'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT || config.dev.port;

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false }),
  },
  devtool: config.dev.devtool,
  devServer: {
    /* 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html */
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: utils.grayPath() + 'index.html' }],
    },
    static: [
      {
        directory: utils.resolve(config.dev.assetsSubDirectory),
        publicPath: config.dev.assetsPublicPath,
        serveIndex: true,
        watch: true,
      },
    ],
    client: {
      overlay: false,
      progress: true,
    },
    host: HOST,
    port: PORT,
    hot: true, // 热加载
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new Dotenv({
      path: utils.resolve('.env.dev'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
      templateParameters: {
        BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
        THEME_COLOR: config.primaryColor,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
});

if (config.dev.useEslint) {
  devWebpackConfig.plugins.push(
    new ESLintPlugin({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'] })
  );
}

module.exports = devWebpackConfig;
