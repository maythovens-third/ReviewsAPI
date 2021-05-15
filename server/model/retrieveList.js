const db = require('../db');
const listHelpers = require('./helpers/listHelpers.js');

module.exports = {
  retrieveList: (params, callback) => {
    listHelpers.queryReviewsTable(params, (err, id, reviewData) => {
      if (err) {
        callback(err);
      } else {
        listHelpers.queryPhotosTable(id, (err, photosData) => {
          if (err) {
            callback(err);
          } else {
            callback(null, listHelpers.formatData(params, reviewData, photosData));
          }
        })
      }
    })
  }
}
