# ReviewsAPI

Data

characteristics:
  id, product_id, name


know the mean, know the size, determine the sum , add the value, derive the new mean

end reuslt - all review chars by char id

isolate all the reviews that have a certain product_id
isolate all the values that have any of those review_id's
isolate all those values that have one specific characteristic_id

isolate all the reviews that have a certain product_id

if N is small,

tradeoff:


index - another table where
psotgres dbms craetes a talbe, keeps track of location of records by

index -

dont log by db seeding

sqlfiddle



reviews temp - make a new one!!!! changed how date works
chars temp
photos temp
chars_reviews temp

write reviews temp to reviews if product id exists in products
write chars temp to chars if product id exists in products
write photos temp to photos if review id exists in reviews
write chars_reviews temp to chars_reviews if review_id exists in reviews AND chars_id exists in chars
