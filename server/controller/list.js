var model = require('../model/');

module.exports = {
  list: (req, res) => {
    console.log('incoming request to list');
    var id = req.query.product_id;
    var page = req.query.page;
    var count = req.query.count;
    var sort = req.query.sort;
    model.list.retrieveList(id, page, count, sort, (err, data) => {
      if (err) {
        console.log('error retrieving list');
        res.status(400);
        res.send(err);
      } else {
        res.status(200);
        res.send(data);
      }
    })
  }
}
