-- COPY ALL PHOTOS


COPY photos
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Photos.csv'
DELIMITER ',' CSV HEADER;