MONGOOSE SCHEMAS - ONE COLLECTION, TWO SCHEMAS, TWO DOCUMENTS PER PRODUCTID

META SCHEMA - ONE PER PRODUCT ID
{
  product_id: Number,
  meta: Boolean,     // how I differentiate between meta and not meta in query? - should be fast?
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {
    0: Number,
    1: Number,
  },
  characteristics: {
    Size_idnum: String,
    Length_idnum: String,
    Width: String,
    Comfort: String,
    Quality: String,
    Fit: String,
  }
}


REVIEWS SCHEMA - ONE PER PRODUCT ID
{
  product_id: Number,
  meta: Boolean,          // differentiate between meta and review - object property lookup so fast?
  page: Number,
  count: Number,
  results: [
    review_id: Number,
    rating: Number,
    summary: String,
    Recommend: Boolean,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: Number,
    reported: Boolean,
    photos: [
      { id: Number, url: String },
    ]
  ]
}




// Get to /reviews using product_id, count, sort, page
// product_id
// page
// count
// results - array
//   review id
//   rating
//   summary
//   recommend
//   resposne
//   body
//   date
//   reviewer_name
//   helpfulness
//   photos - array of objects - id, url


// get to /meta using product_id
// product_id
//   ratings - object 1-5 with numbers of each review
//   recommended - object iwth 0, 1
//   characteristics - object with 6 possible keys
//     nested - Size - object with id, value

// PUT to /reviews/review_id/helpful
// increment helpful of that review_id

// PUT to /reviews/review_id/report
// turn reported boolean to true?