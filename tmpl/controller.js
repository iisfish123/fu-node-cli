'use strict'
/**
 * @Controller <%= name %> 用户接口
 */
const Controller = require('egg').Controller;

class <%= toUpperCaseName %>Controller extends Controller {
  async index() {
    const { ctx, service } = this
    const result = await service.<%= name %>.index()
    ctx.helper.success(result)
  }
}

module.exports = <%= toUpperCaseName %>Controller;