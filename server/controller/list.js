var model = require('../model/');

module.exports = {
  list: (req, res) => {
    var id = req.query.product_id;
    var page = req.query.page;
    var count = req.query.count;
    var sort = req.query.sort;
    model.meta.retrieveList(id, page, count, sort, (err, data) => {
      if (err) {
        console.log('error retrieving list');
        res.status(400);
        res.end();
      } else {
        res.status(200);
        res.send(data);
      }
    })
  }
}