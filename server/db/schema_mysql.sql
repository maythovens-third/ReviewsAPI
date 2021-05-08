DROP DATABASE IF EXISTS reviewAPI;
CREATE DATABASE reviewAPI;
USE reviewAPI;

CREATE TABLE products (
  id INT PRIMARY KEY
);

CREATE TABLE reviews (
  id INT PRIMARY KEY,
  product_id INT,
  rating TINYINT,
  date TEXT,
  summary VARCHAR(60),
  body TEXT,
  recommended TINYINT,
  reported TINYINT,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response TEXT,
  helpfulness INT,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE photos (
  id INT PRIMARY KEY,
  review_id INT NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews_characteristics (
  id INT PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY(review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  FOREIGN KEY(characteristic_id) REFERENCES characteristics(id) ON DELETE CASCADE
);