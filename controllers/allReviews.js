const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.postReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();

  listing.reviews.push(review._id);
  await listing.save();

  req.flash("success", "New review has been added successfully");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.getEditReview = async (req, res) => {
  let { id, rev_id } = req.params;
  let review = await Review.findById(rev_id);
  res.render("listings/editReview.ejs", { id, review });
};

module.exports.putReview = async (req, res) => {
  let { id, rev_id } = req.params;
  let updatedList = req.body.review;

  await Review.findByIdAndUpdate(rev_id, updatedList, {
    runValidators: true,
    new: true,
  });

  req.flash("warning", "Review has been updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, rev_id } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: rev_id } });
  await Review.findByIdAndDelete(rev_id);
  req.flash("danger", "Review has been deleted!!!");
  res.redirect(`/listings/${id}`);
};
