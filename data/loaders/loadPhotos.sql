-- COPY ALL PHOTOS


COPY photos_temp
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean_Photos.csv'
DELIMITER ',' CSV HEADER;