-- LOAD REVIEWS INTO MYSQL DB
USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_noQ_Reviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ','
IGNORE 1 LINES;