'use strict'

module.exports = () => {
  const exports = {}

  exports.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [''] // 配置白名单
  }

  exports.cors = {
    origin: '*', // 允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // MongoDB 数据库
  // SIT环境数据库账号密码配置
  const SIT_OPTIONS = {
    url: '',
    options: {
      user: '',
      pass: '',
      authSource: '',
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  }

  // UAT环境数据库账号密码配置
  const UAT_OPTIONS = {
    url: '',
    options: {
      user: '',
      pass: '',
      authSource: '',
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  }

  // PROD环境数据库账号密码配置
  const RPOD_OPTIONS = {
    url: '',
    options: {
      user: '',
      pass: '',
      authSource: '',
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  }

  exports.mongoose = {
    // client: process.env.NODE_HOST === 'idc' ? IDC_OPTIONS : DOCKER_OPTIONS,
  }
  return exports
};
