-- LOAD PRODUCTS INTO MYSQL
USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Product.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
IGNORE 1 LINES;