'use strict';
const { Service } = require('egg');
class HomeService extends Service {
  async index() {
    // console.log(this.ctx.model)
    const result = await this.ctx.model.Home.find();
    // const result = 'hi egg!';
    return result;
  }
}
module.exports = HomeService;

