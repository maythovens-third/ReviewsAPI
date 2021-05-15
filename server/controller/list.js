var model = require('../model/');

module.exports = {
  getList: (req, res) => {
    model.list.retrieveList(req.query, (err, data) => {
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
