const csv = require('csv-parser');
const fs = require('fs');
const { pipeline } = require('stream');
var csvWriter = require('csv-write-stream');


// client.query(`INSERT INTO reviews (id, product_id, rating) VALUES ('5', '1', '5');`, console.log('it worked'));



// const testResults = [];

const cleanReviews = function(review) {
  let parsedEpoch = parseInt(review.date)
  if (parsedEpoch) {
    let newDate = new Date(parsedEpoch)
    review.date = newDate.toString();
  }
  review.id = parseInt(review.id);
  review.product_id = parseInt(review.id);
  review.rating = parseInt(review.rating);
  review.helpfulness = parseInt(review.helpfulness);
  review.recommended = (review.recommended === 'true');
  review.reported = (review.reported === 'true');
  if (review.response === 'null' || review.response === undefined) {
    review.response = null;
  }
  return review;
}

pipeline(
  fs.createReadStream('./csv/reviews_short.csv'),
  cleanReviews(),
  fs.createWriteStream('./csv/clean_test.csv'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }

);
  // .pipe(csv({
  //   headers: ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommended', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness'],
  //   skipLines: 1,
  // }))
  // .on('data', (data) => {

  // })
  // .on('error', (err) => console.log(err))
  // .on('end', () => {
  //   console.log(testResults);
  // });



  // let parsedEpoch = parseInt(data.date)
  //   if (parsedEpoch) {
  //     let newDate = new Date(parsedEpoch)
  //     data.date = newDate.toString();
  //   }
  //   data.id = parseInt(data.id);
  //   data.product_id = parseInt(data.id);
  //   data.rating = parseInt(data.rating);
  //   data.helpfulness = parseInt(data.helpfulness);
  //   data.recommended = (data.recommended === 'true');
  //   data.reported = (data.reported === 'true');
  //   if (data.response === 'null' || data.response === undefined) {
  //     data.response = null;
  //   }
  //   // testResults.push(data);
  //   var writer = csvWriter({ headers: ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommended', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness']});
  //   writer.pipe(fs.createWriteStream('cleanTest.csv'));
  //   writer.write(data);




  // testResults.forEach(result => {
  //   const query = {
  //     text: 'INSERT INTO reviews(id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
  //     values: [result.id, result.product_id, result.rating, result.date, result.summary, result.body, result.recommended, result.reported, result.reviewer_name, result.reviewer_email, result.response, result.helpfulness],
  //   }
  //     pool
  //       .query(query)
  //       .catch(err => console.log(err));
  //   });