const db = require('../../db');

module.exports = {
  formatMetaData: (id, reviewsData, charsData, reviewsCharsData) => {
    var ratingsTally = {};
    var recommendTally = { 0: 0, 1: 0};
    var charsMeta = {};
    reviewsData.forEach(review => {
      if (!ratingsTally[review.rating]) {
        ratingsTally[review.rating] = 1;
      } else {
        ratingsTally[review.rating]++;
      }
      recommendTally[review.recommended]++;
    })
    var sumsHolder = {};
    var totalsHolder = {};
    reviewsCharsData.forEach(relation => {
      if (!sumsHolder[relation.characteristic_id]) {
        sumsHolder[relation.characteristic_id] = relation.value;
        totalsHolder[relation.characteristic_id] = 1;
      } else {
        sumsHolder[relation.characteristic_id] += relation.value;
        totalsHolder[relation.characteristic_id]++;
      }
    })
    var meanHolder = {};
    for (var sum in sumsHolder) {
      var mean = (sumsHolder[sum] / totalsHolder[sum]).toFixed(3).toString();
      meanHolder[sum] = mean;
    }
    charsData.forEach(char => {
      if (!charsMeta[char.name]) {
        charsMeta[char.name] = {
          id: char.id,
          value: meanHolder[char.id]
        };
      }
    });
    var formattedData = {
      product_id: id,
      ratings: ratingsTally,
      recommended: recommendTally,
      characteristics: charsMeta
    }
    return formattedData;
  }
}