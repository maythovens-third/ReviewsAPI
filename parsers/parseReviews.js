const csv = require('csv-parser');
const fs = require('fs');

const reviewsResults = [];

fs.createReadStream('./csv/reviews_short.csv')
  .pipe(csv({
    headers: ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommended', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness'],
    skipLines: 1,
  }))
  .on('data', (data) => {
    // data.date = new SimpleDateFormat(data.date);
    // data.date = sdf.parse(data.date);
    var submissionDate = new Date(parseInt(data.date));
    data.date = submissionDate.toUTCString();
    reviewsResults.push(data);
  })
  .on('error', (err) => console.log(err))
  .on('end', () => console.log('reviews', reviewsResults));

// CHECK THIS OUT