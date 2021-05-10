const db = require('../db');

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

                var ratingsTally = {};
                var recommendTally = { 0: 0, 1: 0};
                var charsMeta = {};

                reviewsData.forEach(review => {
                  if (!ratingsTally[review.rating]) {
                    ratingsTally[review.rating] = 1;
                  } else {
                    ratingsTally[review.rating]++;
                  }
                  recommendTally[review.recommended]++;
                })

                var sumsHolder = {};
                var totalsHolder = {};
                reviewsCharsData.forEach(relation => {
                  if (!sumsHolder[relation.characteristic_id]) {
                    sumsHolder[relation.characteristic_id] = relation.value;
                    totalsHolder[relation.characteristic_id] = 1;
                  } else {
                    sumsHolder[relation.characteristic_id] += relation.value;
                    totalsHolder[relation.characteristic_id]++;
                  }
                })

                var meanHolder = {};
                for (var sum in sumsHolder) {
                  var mean = (sumsHolder[sum] / totalsHolder[sum]).toFixed(3).toString();
                  meanHolder[sum] = mean;
                }

                charsData.forEach(char => {
                  if (!charsMeta[char.name]) {
                    charsMeta[char.name] = {
                      id: char.id,
                      value: meanHolder[char.id]
                    };
                  }
                });

                var formattedData = {
                  product_id: productId,
                  ratings: ratingsTally,
                  recommended: recommendTally,
                  characteristics: charsMeta
                }
                callback(null, formattedData);
              }
            })
          }
        })
      }
    })
  }
}