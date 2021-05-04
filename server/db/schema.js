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
  characteristics: {
    size_id: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
      average: String,
    },
    length_id {},
    width_id: {},
    comfort_id: {},
    quality_id: {},
    fit_id: {},
  },
  reviews: [          // DOES THIS EVEN HAVE TO BE HERE? must be pushed to each time a review written for this product
    { review_id: Number }, // each a unique identifier
    { review_id: Number }
    etc...
  ]
}

REVIEW SCHEMA - ONE PER REVIEW, MANY WITH SAME PRODUCT ID
{
  review_id: Number, // unique to each document
  product_id: Number,
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










CHARACTERISTICS SCHEMA - ONE PER PRODUCT
{
  product_id: Number,   // unique to each document
  characteristics: {
    size_id: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
      average: String,
    },
    length_id {},
    width_id: {},
    comfort_id: {},
    quality_id: {},
    fit_id: {},
  }
}

WAS IN PRODUCT SCHEMA, DONT NEED?
reviews: [          // DOES THIS EVEN HAVE TO BE HERE? must be pushed to each time a review written for this product
  review_id: Number, // each a unique identifier
  review_id: Number,
  etc...
]