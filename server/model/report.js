const db = require('../db');

module.exports = {
  report: (id, callback) => {
    var queryString = `UPDATE reviews SET reported = 1 WHERE (id = ${id})`;
    db.query(queryString, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }
}