CREATE TABLE products (
  id INTEGER PRIMARY KEY
);

CREATE TABLE reviews_temp (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommended BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
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
  CONSTRAINT fk_reviews
    FOREIGN KEY(product_id)
      REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE photos_temp (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  CONSTRAINT fk_photos
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
        ON DELETE CASCADE
);

CREATE TABLE characteristics_temp (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20)
);

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(20),
  CONSTRAINT fk_characteristics
    FOREIGN KEY (product_id)
      REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE reviews_characteristics_temp (
  id INTEGER PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
);

CREATE TABLE reviews_characteristics (
  id INTEGER PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  CONSTRAINT fk_reviews_chars
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
        ON DELETE CASCADE,
  CONSTRAINT fk_chars_reviews
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
        ON DELETE CASCADE
);
