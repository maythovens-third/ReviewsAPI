# ReviewsAPI

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Overview](#overview)
5. [Challenges](#challenges)
6. [Scaling](#scaling)
7. [Documentation](#documentation)
8. [Future Improvements](#future-improvements)

## Introduction

<ul>
<li>
ReviewsAPI is a multi-layered backend system that stores ~25 million records of product review data. This project was commissioned by a client in order to replace their previous backend system with a more performant version. This project was initiated with the goal of serving 1,000 client requests per second while maintaining a 0% error rate.
</li>
</ul>

## Technologies
<ul>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://expressjs.com/">Express</a></li>
<li><a href="https://www.mysql.com/">MySQL</a></li>
<li><a href="https://aws.amazon.com/ec2/">Amazon Elastic Compute Cloud</a></li>
<li><a href="https://www.nginx.com/">NGINX</a></li>
<li><a href="https://k6.io/">k6.io</a> - Performance testing in development</li>
<li><a href="https://loader.io/">Loader.io</a> - Performance testing in production</li>
</ul>

## Getting Started

1. Fork & clone repository
2. Navigate to root directory on local machine
3. Install the project's dependencies
```
npm install
```
4. Start server
```
npm run server-dev
```
5. Check in terminal that ReviewsAPI is running, and that it is connected to the remote MySQL database. (Remote MySQL instance may be turned off)

## Overview

## Challenges

## Scaling

## Documentation

* This is an API service that provides consumer review information for a project titled Project Catwalk. Project Catwalk is an e-commerce site with a large quantity of clothing and footwear products. As stated previously, this API service provides all information about the ratings & reviews of products in the catalog. Project Catwalk uses 3 separate services for its data.

### List Reviews by Product

*  GET `/reviews`
* Returns a list of reviews for a given product. This list does not include any reviews that have been reported by a user viewing them on the client.

#### Query Parameters:

* `page` - integer - Selects the page of results to return - default 1
* `count` - integer - Specifies how many results per page to return - default 5
* `sort` - text - Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
* `product_id` - integer - Specifies the product for which to retrieve reviews

#### Response:

* `Status: 200 OK`

```
    {
      "product": "2",
      "page": 0,
      "count": 5,
      "results": [
        {
          "review_id": 5,          "rating": 3,
          "summary": "I'm enjoying wearing these shades",
          "recommend": false,
          "response": null,
          "body": "Comfortable and practical.",
          "date": "2019-04-14T00:00:00.000Z",
          "reviewer_name": "shortandsweeet",
          "helpfulness": 5,
          "photos": [{
              "id": 1,
              "url": "urlplaceholder/review_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/review_5_photo_number_2.jpg"
            },
            // ...
          ]
        },
        {
          "review_id": 3,
          "rating": 4,
          "summary": "I am liking these glasses",
          "recommend": false,
          "response": "Glad you're enjoying the product!",
          "body": "They are very dark. But that's good because I'm in very sunny spots",
          "date": "2019-06-23T00:00:00.000Z",
          "reviewer_name": "bigbrotherbenjamin",
          "helpfulness": 5,
          "photos": [],
        },
        // ...
      ]
    }
```

### Retrieve Product Review Metadata

* GET `/reviews/meta`
* Returns review metadata for a given product.

#### Query Parameter:

* `product_id` - integer - Required ID of the product for which data shold be returned

#### Response:

* `STATUS 200 OK`

```
    {
      "product_id": "2",
      "ratings": {
        2: 1,
        3: 1,
        4: 2,
        // ...
      },
      "recommended": {
        0: 5
        // ...
      },
      "characteristics": {
        "Size": {
          "id": 14,
          "value": "4.0000"
        },
        "Width": {
          "id": 15,
          "value": "3.5000"
        },
        "Comfort": {
          "id": 16,
          "value": "4.0000"
        },
        // ...
      }
```

### Post a Review

* POST `/reviews`
* Add a review for the product being viewed.

#### Body Parameters:

* `product_id` - integer - Required ID of the product to post the review for
* `rating` - int - Integer 1-5 indicating overall product rating
* `summary` - text - Summary text of the review
* `body` - text - Continued or full text of the review
* `recommend` - bool - Value indicating if the reviewer recommends the product
* `name` - text - Username of review writer
* `email` - text - Email address of review writer
* `photos` - [text] - Array of text URLs that link to images to be shown
* `characteristics` - object - Object of keys representing characteristic_id and values representing the review value for that characteristic.
    ex:  { "14": 5, "15": 5 //...}

#### Response:

* `STATUS 201 CREATED`

### Mark Review as Helpful

* PUT `/reviews/:review_id/helpful`
* Updates a review to show it was found helpful

#### Path Parameter:

* `review_id` - integer - Required ID of the review to update

#### Response:

* `STATUS 204 NO CONTENT`

### Report Review

* PUT `/reviews/:review_id/report`
* Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in GET to /reviews/ anymore.

#### Path Parameter:

* `review_id` - integer - Required ID of the review to update

#### Response:

* `STATUS 204 NO CONTENT`

## Future Improvements

* Containerize with Docker / Kubernetes
