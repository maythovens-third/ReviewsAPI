DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

USE reviews;

CREATE TABLE products (
  id INTEGER NOT NULL PRIMARY KEY
  rec_true INTEGER,
  rec_false INTEGER,
  rate_1 INTEGER,
  rate_2 INTEGER,
  rate_3 INTEGER,
  rate_4 INTEGER,
  rate_5 INTEGER,
);

CREATE TABLE reviews (
  review_id INTEGER NOT NULL PRIMARY KEY,
  rating INTEGER,
  summary VARCHAR(60),
  recommended BOOLEAN,
  response VARCHAR(1000),
  body VARCHAR(1000),
  date TIMESTAMPTZ DEFAULT NOW(),
  reviewer_name VARCHAR(30),
  helpfulness INTEGER,
  reported BOOLEAN,
  product_id INTEGER NOT NULL,
  CONSTRAINT fk_reviews_products
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE photos (
  photo_id INTEGER NOT NULL PRIMARY KEY,
  url VARCHAR(100) NOT NULL,
  review_id INTEGER NOT NULL,
  CONSTRAINT fk_photos
    FOREIGN KEY(review_id)
      REFERENCES reviews(review_id)
);

CREATE TABLE characteristics (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(20),
);

CREATE TABLE reviews_chars (
  id INTEGER NOT NULL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  CONSTRAINT fk_reviews_chars
    FOREIGN KEY(review_id)
      REFERENCES reviews(review_id)
  CONSTRAINT fk_chars_reviews
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
);

CREATE TABLE product_chars (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  average VARCHAR(6),
  CONSTRAINT fk_chars_products
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
  CONSTRAINT fk_products_chars
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);