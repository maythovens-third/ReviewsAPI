const db = require('../db');

module.exports = {
  insertReview: (review, photos, chars, callback) => {
    // insert into reviews all the review information - including default values
    // insert into photos all the photo urls - with each one getting the review_id that gets created by inserting reviews
    // insert into chars all the chars names/values/product_id, using review_id that gets created by inserting reviews
    var date = Date.now();
    console.log(chars);

    var reviewQuery = `
    INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reviewer_name, reviewer_email)
    VALUES (${review[0]}, ${review[1]}, '${date}', '${review[2]}', '${review[3]}', ${review[4]}, '${review[5]}', '${review[6]}');
    `;
    db.query(reviewQuery, (reviewInsertErr, reviewRecord) => {
      if (reviewInsertErr) {
        callback(reviewInsertErr);
      } else {
        var charsNames = Object.keys(chars);
        console.log('cn', charsNames);
        var charsQuery = `INSERT INTO reviews_characteristics (characteristic_id, review_id, value) VALUES `;
        charsNames.forEach(name => {
          var valuesString = (`(${name}, ${reviewRecord.insertId}, ${chars[name]}), `);
          charsQuery += (valuesString);
        })
        charsQuery = charsQuery.slice(0, -2);
        charsQuery += (`;`);
        db.query(charsQuery, (charInsertErr) => {
          if (charInsertErr) {
            console.log('err', charInsertErr);
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