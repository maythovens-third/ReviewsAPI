-- LOAD PHOTOS INTO MYSQL
USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
IGNORE 1 LINES;