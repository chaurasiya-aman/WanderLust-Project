const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewControllers = require("../controllers/allReviews.js");


router
  .route("/")
  .post(isLoggedIn, validateReviews, wrapAsync(reviewControllers.postReview));


router
  .route("/:rev_id")
  .get(isReviewAuthor, wrapAsync(reviewControllers.getEditReview))
  .put(isReviewAuthor, validateReviews, wrapAsync(reviewControllers.putReview))
  .delete(isReviewAuthor, wrapAsync(reviewControllers.deleteReview));

  
module.exports = router;