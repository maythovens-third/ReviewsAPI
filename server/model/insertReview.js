const db = require('../db');

module.exports = {
  insertReview: (review, photos, chars, callback) => {
    var date = Date.now();
    var reviewQuery = `
    INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reviewer_name, reviewer_email)
    VALUES (${review[0]}, ${review[1]}, '${date}', '${review[2]}', '${review[3]}', ${review[4]}, '${review[5]}', '${review[6]}');
    `;
    db.query(reviewQuery, (reviewInsertErr, reviewRecord) => {
      if (reviewInsertErr) {
        callback(reviewInsertErr);
      } else {
        var charsNames = Object.keys(chars);
        var charsQuery = `INSERT INTO reviews_characteristics (characteristic_id, review_id, value) VALUES `;
        charsNames.forEach(name => {
          var valuesString = (`(${name}, ${reviewRecord.insertId}, ${chars[name]}), `);
          charsQuery += (valuesString);
        })
        charsQuery = charsQuery.slice(0, -2);
        charsQuery += (`;`);
        db.query(charsQuery, (charInsertErr) => {
          if (charInsertErr) {
            var rollbackQueryString = `DELETE FROM reviews WHERE id = ${reviewRecord.insertId}`
            db.query(rollbackQueryString, (reviewDeleteErr) => {
              if (reviewDeleteErr) {
                callback(reviewDeleteErr);
              } else {
                callback(charInsertErr);
              }
            });
          } else {
            if (photos.length > 0) {
              var photosQuery = `INSERT INTO photos (review_id, url) VALUES `;
              photos.forEach(url => {
                var urlString = `(${reviewRecord.insertId}, '${url}'), `;
                photosQuery += urlString;
              })
              photosQuery = photosQuery.slice(0, -2);
              photosQuery += `;`;
              db.query(photosQuery, (photoInsertErr) => {
                if (photoInsertErr) {
                  var rollbackReviews = `DELETE FROM reviews WHERE id = ${reviewRecord.insertId};`
                  db.query(rollbackReviews, (deleteReviewsErr) => {
                    if (deleteReviewsErr) {
                      callback(deleteReviewsErr);
                    } else {
                      var rollbackChars = `DELETE FROM photos WHERE review_id = ${reviewRecord.insertId};`;
                      db.query(rollbackChars, (deleteCharsErr) => {
                        if (deleteCharsErr) {
                          callback(deleteCharsErr);
                        } else {
                          callback(photoInsertErr);
                        }
                      })
                    }
                  })
                } else {
                  callback(null);
                }
              })
            } else {
              callback(null);
            }
          }
        })

      }
    })
  }
}


// insertReview(review, photos, chars, callback)
  // insertReviewsTable(review, (reviewErr, reviewRecord) => {}
    // if err -
  // callback(reviewErr)
    // else
  // insertCharsTable(charsquery, (charsErr) => {})
    // if err
      // rollback reviews
        // if err
          // callback(reviewrollback error)
        // else
          // callback(char insert err)
    // else
      // if there are photos
        // insertPhotosTable(photos, (photosErr) => {})
          // if (photosErr) {
            // rollback reviews
              // if rollback reviews err
                // callback(rollback reviews error)
              // else
                // rollback chars
                  // if rollback chars error
                    // callback(rollback chars error)
                  // else
                    // callback(photosErr)
          // else
            // callback(null)
      // else
        // callback(null)
