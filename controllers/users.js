const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");


module.exports.getSignUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignUp = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    const reg_user = await User.register(newUser, password);
    req.login(reg_user, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome @${username} to WanderLust!!!`);
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("danger", err.message);
    return res.redirect("/user/signup");
  }
};

module.exports.getLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogin = async (req, res) => {
  let { username } = req.body;
  req.flash("success", `Welcome back  @${username} to WanderLust!!!`);
  let url = res.locals.redirectUrl || "/listings";
  console.log(url);
  res.redirect(url);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out successfully");
    res.redirect("/listings");
  });
};

module.exports.delAccount = async (req, res, next) => {
  try {
    const username = res.locals.currUser.username;

    const user = await User.findOne({ username });
    if (!user) {
      return next(new ExpressError(404, "User not found"));
    }

    await Listing.deleteMany({ owner: user._id });

    await Review.deleteMany({ author: user._id });

    await User.deleteOne({ _id: user._id });

    req.flash("success", "Your account has been deleted permanently.");
    return res.redirect("/listings");
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ExpressError(500, err));
  }
};

module.exports.viewList = async (req, res) => {
  const userId = res.locals.currUser._id;

  const listings = await Listing.find({ owner: userId });

  res.render("users/userList.ejs", { allListings: listings });
};


module.exports.userReview = async (req, res) => {
  const userId = req.user._id;

  const listings = await Listing.find({})
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  const reviewedListings = listings
    .map(listing => {
      const myReviews = listing.reviews.filter(
        review => review.author && review.author._id.equals(userId)
      );

      if (myReviews.length > 0) {
        return {
          listing,
          myReviews
        };
      }
    })
    .filter(Boolean);
    console.log(reviewedListings)
  res.render("users/userReviews.ejs", { reviewedListings });
};
