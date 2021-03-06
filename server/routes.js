const controller = require('./controller');
var router = require('express').Router();

router.get('/loaderio-02a210dd0a3801979f8f9855f9162eb2/', controller.loaderio.sendToken);

router.get('/reviews', controller.list.list);

router.get('/reviews/meta/', controller.meta.meta);

router.post('/reviews', controller.create.create);

router.put('/reviews/:review_id/helpful', controller.helpful.helpful);

router.put('/reviews/:review_id/report', controller.report.report);

module.exports = router;
