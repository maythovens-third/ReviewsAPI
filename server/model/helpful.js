const db = require('../db');

module.exports = {
  increment: (id, callback) => {
    var queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE (id = ${id})`;
    db.query(queryString, (err => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }))
  }
}