-- COPY ALL FILES

COPY products
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Product.csv'
DELIMITER ',' CSV HEADER;

