const express = require("express");
const router = express.Router({ mergeParams: true });
const { userSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");
const { isLoggedIn } = require("../middleware.js");

const validateSignUp = (req, res, next) => {
  let { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errorMsg));
  }
  next();
};

router
  .route("/signup")
  .get(userControllers.getSignUp)
  .post(validateSignUp, wrapAsync(userControllers.postSignUp));

router
  .route("/login")
  .get(userControllers.getLogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),
    saveRedirectUrl,
    userControllers.postLogin
  );

router.route("/profile/userList").get(isLoggedIn, userControllers.viewList);
router
  .route("/profile/userReviews")
  .get(isLoggedIn, userControllers.userReview);

router.route("/logout").get(isLoggedIn, userControllers.logout);

router
  .route("/delete-account")
  .delete(isLoggedIn, wrapAsync(userControllers.delAccount), saveRedirectUrl);

router.route("/profile").get((req, res) => {
  res.render("users/profile.ejs");
});

module.exports = router;
