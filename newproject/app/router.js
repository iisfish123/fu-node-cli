'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index)
  router.get('/home/index', controller.home.index)
  router.get('/home/create', controller.home.create)
  router.get('/home/query', controller.home.query)
  router.get('/home/get/:name', controller.home.get)
}
