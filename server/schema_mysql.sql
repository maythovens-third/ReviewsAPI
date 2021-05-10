DROP DATABASE IF EXISTS reviewAPI;
CREATE DATABASE reviewAPI;
USE reviewAPI;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  rating TINYINT,
  date TEXT,
  summary VARCHAR(60),
  body TEXT,
  recommended TINYINT,
  reported TINYINT DEFAULT 0,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response TEXT DEFAULT null,
  helpfulness INT DEFAULT 0,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  review_id INT NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE characteristics (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews_characteristics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY(review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  FOREIGN KEY(characteristic_id) REFERENCES characteristics(id) ON DELETE CASCADE
);