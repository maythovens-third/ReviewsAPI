const db = require('../db');
const metaHelpers = require('./helpers/metaHelpers.js');


module.exports = {
  retrieveMeta: (productId, callback) => {
    var reviewsQuery = `SELECT rating, recommended FROM reviews WHERE product_id = ${productId};`;
    var charsQuery = `SELECT id, name FROM characteristics WHERE product_id = ${productId};`;
    var reviewsCharsQuery = `SELECT characteristic_id, value FROM reviews_characteristics WHERE characteristic_id IN (SELECT id FROM characteristics WHERE product_id = ${productId});`;

    db.query(reviewsQuery, (reviewsErr, reviewsData) => {
      if (reviewsErr) {
        callback(reviewsErr);
      } else {
        db.query(charsQuery, (charsErr, charsData) => {
          if (charsErr) {
            callback(charsErr);
          } else {
            db.query(reviewsCharsQuery, (reviewCharsErr, reviewsCharsData) => {
              if (reviewCharsErr) {
                callback(reviewCharsErr);
              } else {
                callback(null, metaHelpers.formatData(productId, reviewsData, charsData, reviewsCharsData));
              }
            })
          }
        })
      }
    })
  }
}