/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-13 21:47:36
 */
'use strict';
const path = require('path');
const appConf = require('./app.conf');
const envConf = require('./env.conf');

// 配置常量
const HOST = 'localhost';
const PORT = 9020;

module.exports = {
  ...appConf,
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath:
      process.env.ENV_CONFIG === 'gray' ? `//${HOST}:${PORT}/gray/` : `//${HOST}:${PORT}/`,

    // 请求代理配置 -> can be modified
    proxyTable: {
      '/api': {
        target: 'http://10.133.2.84:30203',
        changeOrigin: true, // 支持跨域
        // secure: false, // 支持 https
        pathRewrite: {
          '^/api': '/api', // 连接开发环境，走网关的那种
          // '^/api/[a-zA-Z_]+/': '/' // 本地开发，不走网关，直接调本地服务
        },
      },
    },
    // 请求代理配置 END

    // Various Dev Server settings
    host: HOST,
    port: PORT,
    autoOpenBrowser: true,

    // Use Eslint
    useEslint: true,

    // Source Maps
    devtool: 'eval-cheap-source-map',
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath:
      process.env.ENV_CONFIG === 'gray' ? `${envConf.host}/gray/` : `${envConf.host}/`,

    // Source Maps
    productionSourceMap: false,
    devtool: 'source-map',

    // Gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
};
