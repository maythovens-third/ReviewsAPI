const db = require('../db');

module.exports = {
  retrieveList: (productId, page, count, sort, callback) => {
    if (!productId || !page || !count || !sort) {
      callback('Missing query parameters');
      return;
    }

    var orderFields = '';
    if (sort === 'newest') {
      orderFields = 'date DESC'
    } else if (sort === 'helpful') {
      orderFields = 'helpfulness DESC';
    } else {
      orderFields = 'helpfulness DESC, date DESC';
    }
    var reviewsQuery = `SELECT * FROM reviews WHERE product_id = ${productId} ORDER BY ${orderFields} LIMIT ${count} OFFSET ${((page - 1) * count)}`;

    db.query(reviewsQuery, (reviewsErr, reviewsData) => {
      if (reviewsErr) {
        callback(reviewsErr);
      } else {
        var reviewIds = '(';
        reviewsData.forEach(record => {
          reviewIds += `${record.id}, `;
        })
        reviewIds = reviewIds.slice(0, -2);
        reviewIds += `);`;

        var photosQuery = `SELECT * FROM photos WHERE review_id IN ${reviewIds}`;
        db.query(photosQuery, (photosErr, photosData) => {
          if (photosErr) {
            callback(photosErr);
          } else {
            var responseObj = {
              product: productId,
              page: Number(page),
              count: Number(count),
              results: []
            }
            reviewsData.forEach(record => {
              var review = {
                review_id: record.id,
                rating: record.rating,
                summary: record.summary,
                recommend: (record.recommended === 1),
                response: record.response === 'null' ? null : record.response,
                body: record.body,
                date: new Date(parseInt(record.date)).toString(),
                reviewer_name: record.reviewer_name,
                helpfulness: record.helpfulness,
                photos: []
              };
              responseObj.results.push(review);
            })

            photosData.forEach(photo => {
              for (var review in responseObj.results) {
                if (photo.review_id === responseObj.results[review].review_id) {
                  responseObj.results[review].photos.push({
                    id: photo.id,
                    url: photo.url
                  })
                }
              }
            })
            callback(null, responseObj);
          }
        })




      }
    })
  }
}

// SELECT * FROM reviews r WHERE product_id = 7 RIGHT JOIN photos p on r.id = p.id
// SELECT * FROM reviews INNER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = 15;

// {
//   "product": "2",
//   "page": 0,
//   "count": 5,
//   "results": [
//     {
//       "review_id": 5,
//       "rating": 3,
//       "summary": "I'm enjoying wearing these shades",
//       "recommend": false,
//       "response": null,
//       "body": "Comfortable and practical.",
//       "date": "2019-04-14T00:00:00.000Z",
//       "reviewer_name": "shortandsweeet",
//       "helpfulness": 5,
//       "photos": [{
//           "id": 1,
//           "url": "urlplaceholder/review_5_photo_number_1.jpg"
//         },
//         {
//           "id": 2,
//           "url": "urlplaceholder/review_5_photo_number_2.jpg"
//         },
//         // ...
//       ]
//     },
//     {
//       "review_id": 3,
//       "rating": 4,
//       "summary": "I am liking these glasses",
//       "recommend": false,
//       "response": "Glad you're enjoying the product!",
//       "body": "They are very dark. But that's good because I'm in very sunny spots",
//       "date": "2019-06-23T00:00:00.000Z",
//       "reviewer_name": "bigbrotherbenjamin",
//       "helpfulness": 5,
//       "photos": [],
//     },
//     // ...
//   ]
// }