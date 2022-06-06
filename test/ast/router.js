'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/offlineupdate/admin/save', controller.offline.save);
  router.get('/offlineupdate/admin/findAll', controller.offline.findAll);
  router.get('/offlineupdate/admin/deleteAll', controller.offline.deleteAll);
  router.post('/offlineupdate/admin/pullPackage.json', controller.pullPackage.index);
  router.post('/offlineupdate/admin/findByCondition.json', controller.offline.findByCondition);
  router.post('/offlineupdate/admin/findOldList.json', controller.offline.findOldList);
  router.post('/offlineupdate/admin/findLast.json', controller.offline.findLast);
}