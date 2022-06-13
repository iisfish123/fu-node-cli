'use strict'

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}

// 日志查看器
exports.logview = {
  package: 'egg-logview',
  // env: ['local', 'default', 'test', 'unittest']
}

// 字段验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
}

// swaggerdoc
exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
}
