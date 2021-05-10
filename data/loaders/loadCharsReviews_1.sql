-- COPY REVIEWS CHARS

COPY reviews_characteristics_temp
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_CR_1.csv'
DELIMITER ',' CSV HEADER;