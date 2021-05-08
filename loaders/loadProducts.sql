-- COPY ALL PRODUCTS

COPY products
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Product_using_Chars.csv'
DELIMITER ',' CSV HEADER;

