USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_CR_2.csv'
INTO TABLE reviews_characteristics
FIELDS TERMINATED BY ',';
