MONGOOSE SCHEMAS - ONE COLLECTION, TWO SCHEMAS, TWO DOCUMENTS PER PRODUCTID

ONE:MANY - PRODUCT:REVIEWS

PRODUCT SCHEMA - ONE PER PRODUCT ID - METADATA & REFERENCE TO UNIQUE REVIEW IDS
{
  product_id: Number,  // unique identifier
  ratings: {      // must be incremented each time review written for this product
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {  // must be incremented each time review written for this product
    0: Number,
    1: Number,
  },
  characteristics: {     // averages need to be calculatd each timea review written
    Size_idnum: String,
    Length_idnum: String,
    Width: String,
    Comfort: String,
    Quality: String,
    Fit: String,
  }
  reviews: [          // must be pushed to each time a review written for this product
    review_id: Number, // each a unique identifier
    review_id: Number,
    etc...
  ]
}

REVIEW SCHEMA - ONE PER REVIEW
{
  review_id: Number, // unique identifier
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
}