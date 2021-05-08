USE reviewAPI;

LOAD DATA
LOCAL INFILE '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Characteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ','
IGNORE 1 LINES;