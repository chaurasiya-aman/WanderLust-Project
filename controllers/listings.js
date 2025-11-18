const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const geocodeAddress = require("../utils/geocode.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}).populate("reviews");
  res.render("listings/index.ejs", { allListings });
};

module.exports.getNew = (req, res) => {
  res.render("listings/new.ejs");
};


module.exports.postNew = async (req, res, next) => {
  try {
    // Normalize category to always be an array
    if (!req.body.category) {
      req.body.category = [];
    } else if (!Array.isArray(req.body.category)) {
      req.body.category = [req.body.category];
    }

    // Your existing logic here:
    const url = req.file.path;
    const filename = req.file.filename;

    let newList = req.body;
    newList.owner = req.user._id;

    const fullAddress = `${newList.location}, ${newList.country}`;
    const { lat, lon } = await geocodeAddress(fullAddress);

    const newData = new Listing(newList);
    newData.image = { url, filename };
    newData.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };

    await newData.save();

    req.flash("success", "New Listing has been added successfully");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};



module.exports.getShow = async (req, res) => {
  let { id } = req.params;
  const otp = Math.floor(100000 + Math.random() * 900000);
  let list = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!list) {
    req.flash("warning", "No such Listing found!!");
    return res.redirect("/listings");
  }
  let avg = 0,
    total = 0;
  for (review of list.reviews) {
    total += review.rating;
  }
  avg = list.reviews.length ? total / list.reviews.length : 0;
  res.render("listings/show.ejs", { list, otp, avg });
};

module.exports.getEdit = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list) {
    req.flash("warning", "No such Listing found!!");
    return res.redirect("/listings");
  }

  let originalImgUrl = list.image.url;
  originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { list, originalImgUrl });
};

module.exports.putEdit = async (req, res) => {
  let { id } = req.params;
  let updatedList = req.body;

  const fullAddress = `${updatedList.location}, ${updatedList.country}`;
  const { lat, lon } = await geocodeAddress(fullAddress);
  updatedList.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };
    
  let updatedListing = await Listing.findByIdAndUpdate(id, updatedList, {
    runValidators: true,
    new: true,
  });

  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await updatedListing.save();
  }

  req.flash("warning", "Listing has been updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteEdit = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("danger", "Listing has been deleted!!!");
  res.redirect("/listings");
};

module.exports.categoryList = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const allListings = await Listing.find({ category: categoryName });
    res.render(`listings/category.ejs`, { allListings, categoryName });
  } catch (err) {
    next(new ExpressError(500, "Error fetching listings."));
  }
};
