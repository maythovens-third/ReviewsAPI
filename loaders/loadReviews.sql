-- COPY ALL REVIEWS

COPY reviews_temp
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Reviews.csv'
DELIMITER ',' CSV HEADER;