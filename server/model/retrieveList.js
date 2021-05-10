const db = require('../db');

module.exports = {
  retrieveList: (id, page, count, sort, callback) => {
    // need to deal with:
    // product_id (integer)
    // page (integer) - which page
    // count (integer) - num results per page
    // sort (text) - changes sort order of reviews
      // helpful
      // newest
      // relevant

    //
    // NEED TO GET ALL THE PHOTOS ASSOCIATED WITH EACH REVIEW
    // GET (COUNT) (PAGE) REVIEWS BY PRODUCT ID, AND FOR EACH REVIEW - ALL PHOTOS WITH THAT REVIEW ID


    var queryString = `SELECT * FROM reviews INNER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = ${id};`;
    db.query(queryString, (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log('data', data);
        var dataObj = {
          product: id,
          page: page,
          count: count,
          results: []
        }
        data.forEach(record => {
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
          dataObj.results.push(review);
        })
        callback(null, dataObj);
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