USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_noQ_Characteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ','
IGNORE 1 LINES;