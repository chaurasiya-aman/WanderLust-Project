const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, normalizeCategory} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index));

router
  .route("/new")
  .get(isLoggedIn, listingController.getNew)
  .post(
    isLoggedIn,
    upload.single("image"),
    normalizeCategory,
    validateListing,
    wrapAsync(listingController.postNew)
  );

router
  .route("/:id")
  .get(wrapAsync(listingController.getShow))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteEdit));

router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.getEdit))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    normalizeCategory,
    validateListing,
    wrapAsync(listingController.putEdit)
  );

router.route("/category/:categoryName").get(wrapAsync(listingController.categoryList));


module.exports = router;
