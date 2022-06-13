'use strict';
const { Service } = require('egg');

class <%= toUpperCaseName %>Service extends Service {
  async index() {
    // console.log(this.ctx.model)
    const result = 'hi <%= name %>!';
    return result;
  }
}
module.exports = <%= toUpperCaseName %>Service;
