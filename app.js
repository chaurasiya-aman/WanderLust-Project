if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const secreteKey = process.env.SECRET_KEY;
const dbUrl = process.env.ATLAS_DB_URL;

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.use(express.json());

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connection to DB TravelNest is successful");

  const store = MongoStore.create({
    client: mongoose.connection.getClient(),
    crypto: { secret: secreteKey },
    touchAfter: 24 * 3600,
  });

  store.on("error", (err) => {
    console.error("ERROR in MONGO SESSION STORE", err);
  });

  app.use(session({
    store,
    secret: secreteKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    res.locals.danger = req.flash("danger");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    res.locals.showListingSearch = false;
    res.locals.searchTerm = "";
    next();
  });

  app.get("/", (req, res) => {
    res.render("includes/home.ejs");
  });
  app.use("/listings", listingsRouter);
  app.use("/user", userRouter);
  app.use("/listings/:id/reviews", reviewsRouter);

  app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
  });
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
  });

  app.listen(8080, () => {
    console.log("App running at http://localhost:8080");
  });
}

main().catch((err) => {
  console.error("Unable to start: MongoDB connection failed.", err.message);
  process.exitCode = 1;
});
