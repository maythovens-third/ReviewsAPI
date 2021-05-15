var model = require('../model/');

module.exports = {
  getMeta: (req, res) => {
    var id = req.query.product_id;
    model.meta.retrieveMeta(id, (err, data) => {
      if (err) {
        console.log('error retrieving meta');
        res.status(400);
        res.end();
      } else {
        res.status(200);
        res.send(data);
      }
    })
  }
}