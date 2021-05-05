DROP DATABASE IF EXISTS reviewAPI;
CREATE DATABASE reviewAPI;

USE reviewAPI;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date TIMESTAM DEFAULT NOW(),
  summary VARCHAR(60),
  body TEXT,
  recommended BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(20),
  reviewer_email VARCHAR(30),
  response TEXT,
  helpfulness INTEGER,

  CONSTRAINT fk_reviews_products
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER NOT NULL PRIMARY KEY,
  url VARCHAR(100),
  review_id INTEGER NOT NULL,
  CONSTRAINT fk_photos
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20),
  CONSTRAINT fk_characteristics
    FOREIGN KEY (product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS reviews_characteristics;

CREATE TABLE reviews_characteristics (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  CONSTRAINT fk_reviews_chars
    FOREIGN KEY(review_id)
      REFERENCES reviews(review_id),
  CONSTRAINT fk_chars_reviews
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
);
