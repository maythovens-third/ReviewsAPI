const db = require('../db');

module.exports = {
  insertReview: (review, photos, chars, callback) => {
    // insert into reviews all the review information - including default values
    // insert into photos all the photo urls - with each one getting the review_id that gets created by inserting reviews
    // insert into chars all the chars names/values/product_id, using review_id that gets created by inserting reviews
    var photoParams = [];
    var charsParams = [];
    console.log('insertcharsshape', chars);
    console.log('reviewshape', review);

    var date = Date.now();

    var reviewQuery = `
    INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reviewer_name, reviewer_email)
    VALUES (${review[0]}, ${review[1]}, '${date}', '${review[2]}', '${review[3]}', ${review[4]}, '${review[5]}', '${review[6]}');
    `;
    db.query(reviewQuery, (err, reviewRecord) => {
      if (err) {
        console.log('reviewinsert fail', err);
        callback(err);
      } else {
        var charsNames = Object.keys(chars);
        var charsQuery = `INSERT INTO reviews_characteristics (characteristic_id, review_id, value) VALUES `;
        charsNames.forEach(name => {
          var valuesString = (`(${chars[name].id}, ${reviewRecord.insertId}, ${chars[name].value}), `);
          charsQuery += (valuesString);
        })
        charsQuery = charsQuery.slice(0, -2);
        charsQuery += (`;`);
        db.query(charsQuery, (err) => {
          if (err) {
            // ROLLBACK REVIEW!!!!!!!!!!!!!
            console.log('charsinsert fail', err);
            callback(err);
          } else {
            console.log('charsinsert worked');
            if (photos.length > 0) {
              var photosQuery = `INSERT INTO photos (review_id, url) VALUES `;
              photos.forEach(url => {
                var urlString = `(${reviewRecord.insertId}, '${url}'), `;
                photosQuery += urlString;
              })
              photosQuery = photosQuery.slice(0, -2);
              photosQuery += `;`;
              console.log('photosQuery', photosQuery);
              db.query(photosQuery, (err) => {
                if (err) {
                  console.log('photos fail', err);
                  // ROLLBACK REVIEWS
                  // ROLLBACK CHARS
                  callback(err);
                } else {
                  console.log('photos worked');
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


    if (photos.length > 0) {
      photos.forEach(photo => {
        // create as many photo insert statements as I need
      })
    }

    if (chars.length > 0) {
      chars.forEach(char => {
        // create as many char insert statements as I need
      })
    }


    // start with review query
    // photos.foreach
      // concat more onto the query
    // chars.foreach
      // concat more onto the query

    //



  }
}