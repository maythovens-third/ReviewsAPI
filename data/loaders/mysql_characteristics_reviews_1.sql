USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_CR_1.csv'
INTO TABLE reviews_characteristics
FIELDS TERMINATED BY ','
IGNORE 1 LINES;