const db = require('../db');

module.exports = {
  retrieveList: (params, callback) => {
    var productId = params.product_id;
    var page = params.page;
    var count = params.count;
    var sort = params.sort;
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
    var reviewsQuery = `SELECT * FROM reviews WHERE product_id = ${productId} AND reported = 0 ORDER BY ${orderFields} LIMIT ${count} OFFSET ${((page - 1) * count)}`;

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