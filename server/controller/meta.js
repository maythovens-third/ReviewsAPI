var model = require('../model/');

module.exports = {
  getMeta: (req, res) => {
    var id = req.query.product_id;
    model.meta.retrieveMeta(id, (err, data) => {
      if (err) {
        console.log('error getting meta');
        res.status(404);
        res.end();
      } else {
        res.status(200);
        res.send(data);
      }
    })
  }
}