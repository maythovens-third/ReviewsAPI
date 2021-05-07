DROP DATABASE IF EXISTS reviewAPI;
CREATE DATABASE reviewAPI;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommended BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER,
  CONSTRAINT fk_reviews_products
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS photos;


CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  url TEXT,
  review_id INTEGER NOT NULL,
  CONSTRAINT fk_photos
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20),
  CONSTRAINT fk_characteristics
    FOREIGN KEY (product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS reviews_characteristics;

CREATE TABLE reviews_characteristics (
  id INTEGER PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  CONSTRAINT fk_reviews_chars
    FOREIGN KEY(review_id)
      REFERENCES reviews(id),
  CONSTRAINT fk_chars_reviews
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
);

