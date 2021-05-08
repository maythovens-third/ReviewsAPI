const db = require('../db');

module.exports = {
  retrieveMeta: (id, callback) => {
    // query string - more complicated
    // have to get all the meta information
    // maybe a series of queries

    db.query(queryString, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  }
}