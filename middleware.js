const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("danger", "Please log in to continue.");
    return res.redirect("/user/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list.owner.equals(res.locals.currUser._id)) {
    req.flash("danger", "You are not the owner of this List");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// ValidateListings
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errorMsg));
  }
  next();
};

// ValidateReviews
module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errorMsg));
  }
  next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
  let { rev_id, id } = req.params;
  let review = await Review.findById(rev_id);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("danger", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.normalizeCategory = (req, res, next) => {
  if (req.body.category && !Array.isArray(req.body.category)) {
    req.body.category = [req.body.category];
  }
  next();
};
