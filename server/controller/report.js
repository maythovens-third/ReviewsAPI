var model = require('../model/');

module.exports = {
  report: (req, res) => {
    var id = req.url.split('/')[2];
    model.report.report(id, (err) => {
      if (err) {
        console.log('report error');
        res.status(404);
        res.end();
      } else {
        res.status(204);
        res.end();
      }
    })
  }
}