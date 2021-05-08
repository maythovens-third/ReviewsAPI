const db = require('../db');

module.exports = {
  retrieveList: (id, page, count, sort, callback) => {
    // need to deal with:
    // product_id (integer)
    // page (integer) - which page
    // count (integer) - num results per page
    // sort (text) - changes sort order of reviews
      // helpful
      // newest
      // relevant

    db.query(queryString, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  }
}