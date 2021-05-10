const db = require('../db');

module.exports = {
  retrieveMeta: (id, callback) => {
    var reviewsQuery = `SELECT rating, recommended FROM reviews WHERE product_id = ${id} LIMIT 25;`;
    var charsQuery = `SELECT id, name FROM characteristics WHERE product_id = ${id} LIMIT 25;`;
    var reviewsCharsQuery = `SELECT characteristic_id, value FROM reviews_characteristics WHERE characteristic_id IN (SELECT id FROM characteristics WHERE product_id = ${id}) LIMIT 1000;`;

    db.query(reviewsQuery, (reviewsErr, reviewsData) => {

      if (reviewsErr) {
        console.log('fail reviews query', reviewsErr);
        callback(reviewsErr);

      } else {


        db.query(charsQuery, (charsErr, charsData) => {

          if (charsErr) {
            console.log('fail chars query', charsErr);
            callback(charsErr);

          } else {

            db.query(reviewsCharsQuery, (reviewCharsErr, reviewsCharsData) => {

              if (reviewCharsErr) {
                console.log('fail reviews_chars query', reviewCharsErr);
                callback(reviewCharsErr);

              } else {

                console.log('meta log1', reviewsData);
                console.log('meta log2', charsData);
                console.log('meta log3', reviewsCharsData);

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
                  product_id: id,
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



// explain analyze

// {
//   "product_id": "2",
//   "ratings": {
//     2: 1,
//     3: 1,
//     4: 2,
//     // ...
//   },
//   "recommended": {
//     0: 5
//     // ...
//   },
//   "characteristics": {
//     "Size": {
//       "id": 14,
//       "value": "4.0000"
//     },
//     "Width": {
//       "id": 15,
//       "value": "3.5000"
//     },
//     "Comfort": {
//       "id": 16,
//       "value": "4.0000"
//     },
//     // ...
//   }

// SELECT characteristic_id, value FROM reviews_characteristics WHERE review_id IN (SELECT review_id FROM reviews WHERE product_id = 3);
//             var reviewsCharsQuery = `SELECT characteristic_id, value FROM reviews_characteristics WHERE review_id IN (SELECT review_id FROM reviews WHERE product_id = 25) LIMIT 100;`;