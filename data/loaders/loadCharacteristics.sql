-- COPY CLEAN CHARACTERISTICS

COPY characteristics_temp
FROM '/Users/samgasser/hackreactor/ReviewsAPI/csv/clean__noQ_Characteristics.csv'
DELIMITER ',' CSV HEADER;

