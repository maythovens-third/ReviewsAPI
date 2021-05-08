var model = require('../model/');

module.exports = {
  helpful: (req, res) => {
    var id = req.url.split('/')[2];
    model.helpful.increment(id, (err) => {
      if (err) {
        console.log('helpful increment error');
        res.status(400);
        res.end();
      } else {
        res.status(204);
        res.end();
      }
    })
  }
}