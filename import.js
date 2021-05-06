const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('./csv/characteristics.csv')
  .pipe(csv({
    headers: ['id', 'product_id', 'name'],
    skipLines: 1,
  }))
  .on('data', (data) => {
    if (data.id === 1) {
      data[name] = 'HELLOSAM';
    }
    results.push(data);
  })
  .on('error', (err) => console.log(err))
  .on('end', () => console.log(results));



// throw out photos records where
  // photo_id is missign
  // review_id is missing
  // URL is missing
  // no commas

// chars_reviews looks fine