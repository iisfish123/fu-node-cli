/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1654507988627_5162';

  // add your middleware config here
  // exports.middleware = ['errorHandler']

  /**
   * logview default config
   * @member Config#logview
   * @property {String} prefix - logview route prefix, default to `__logs`
   * @property {String} dir - logview dir, default to `app.config.logger.dir`
   */
   exports.logview = {
  };

  // add your middleware config here
  // config.middleware = [];

  // 允许跨域
  exports.proxy = true;

  exports.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  }

  exports.cors = {
    origin: '*', // 允许所有跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // MongoDB 数据库
  exports.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/offline_db',
      options: {
        // user: 'root',
        // pass: '123456',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    },
  }
  // egg-security
  exports.middleware = ['securitycCsrf', 'errorHandler']
  exports.securitycCsrf = {
    referer: [/Baiduspider/i],
  }
  // swaggerdoc
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '<%= projectName %>',
      description: 'api for swaggerdoc',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enable: true,
    routerMap: false,
  }

  return {
    ...config,
    ...userConfig,
  };
};
