const controller = require('./controller');
var router = require('express').Router();

router.get('/reviews/', controller.get);

router.get('/reviews/meta/', controller.meta);

router.post('/reviews', controller.post);

router.put('/reviews/:review_id/helpful', controller.helpful);

router.put('/reviews/:review_id/report', controller.report);

module.exports = router;
