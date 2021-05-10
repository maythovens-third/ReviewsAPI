var model = require('../model/');

module.exports = {
  create: (req, res) => {
    var review = [
      req.body.product_id,
      req.body.rating,
      req.body.summary,
      req.body.body,
      req.body.recommend ? 1: 0,
      req.body.name,
      req.body.email
  ];
    var photoUrls = req.body.photos;
    var characteristics = req.body.characteristics;

    model.create.insertReview(review, photoUrls, characteristics, (err, data) => {
      if (err) {
        console.log('error creating review');
        res.status(400);
        res.end();
      } else {
        res.status(201);
        res.end();
      }
    })
  }
}