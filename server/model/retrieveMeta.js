const db = require('../db');

module.exports = {
  retrieveMeta: (id, callback) => {
    console.log('hello');
    // select ratings, recommended from reviews
    // select characteristic_id, value from reviews_characteristics where product_id equals id in characteristics
    // select id, name from characteristics where product_id = id

    // get ratings/recommended from EVERY reviews record where product_id = id
    reviewsQuery = `SELECT rating, recommended FROM reviews WHERE product_id = 25 LIMIT 25;`;
    db.query(reviewsQuery, (err, reviewsData) => {
      if (err) {
        console.log('fail reviews query');
        callback(err);
      } else {
        // get name, id from EVERY chars record where product_id = id
        var charsQuery = `SELECT id, name FROM characteristics WHERE product_id = 25 LIMIT 25;`;
        db.query(charsQuery, (err, charsData) => {
          if (err) {
            console.log('fail chars query');
            callback(err);
          } else {
            // data 2 for each -
            // select value from reviews_chars where





            // console.log('charsdata');
            // // get value, char_id from EVERY reviews_chars record WHERE the review_id points to a review that has a product_id = id
            var reviewsCharsQuery = `SELECT characteristic_id, value FROM reviews_characteristics WHERE review_id IN (SELECT review_id FROM reviews WHERE product_id = 25) LIMIT 100;`;
            db.query(reviewsCharsQuery, (err, reviewsCharsData) => {
              if (err) {
                console.log('fail reviews_chars query');
                callback(err);
              } else {
                console.log('meta log1', reviewsData);
                console.log('meta log2', charsData);
                console.log('meta log3', reviewsCharsData);

                var ratingsTally = {};  // sum all ratings 1-5 from reviews and put inside this object
                var recommendTally = {};  // sum all recommends 1, 2 from reviews and put inside this object
                var chars = {};

                // change the data into the desired shape
                var formattedData = {
                  product_id: id,
                  ratings: ratingsTally,
                  recommended: recommendTally,
                  characteristics: charsData
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