'use strict'
/**
 * @Controller home 用户接口
 */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  /**
   * @summary hello egg!
   * @description test
   * @router get /home/index
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx, service } = this
    const result = await service.home.index()
    ctx.helper.success(result)
  }

  /**
   * @summary 创建用户
   * @description 创建用户
   * @router get /home/create'
   * @request body create *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.create)
    const user = ctx.request.body
    ctx.helper.success({ user })
  }

  /**
   * @summary 获取用户
   * @description 分页获取用户信息
   * @router get /home/query
   * @request query integer name 名字 默认 lkz
   * @request query integer age 年龄 默认 20
   */
  async query() {
    const { ctx, service } = this
    // 校验参数
    let name = Number(ctx.query.name || 'lkz')
    let age = Number(ctx.query.age || 20)
    ctx.helper.success({ name, age })
  }

  /**
   * @summary 获取用户
   * @description 获取用户信息
   * @router get /home/users/{name}
   * @request path string *name
   */
   async get() {
    const { ctx, service } = this
    let name = ctx.params.name
    ctx.helper.success({ name })
  }

  /**
   * @ignore 忽略校验
   */
   async nothing() {
    const { ctx } = this
    ctx.helper.success('nothing message')
  }
}

module.exports = HomeController;
