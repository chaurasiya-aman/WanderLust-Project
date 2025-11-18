const Joi = require("joi");

const allowedCategories = [
  "farms",
  "rooms",
  "mountains",
  "beach",
  "pools",
  "iconic-city",
  "snowy",
  "boats",
  "camping",
];

// Server side validation for listing
module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().allow("", null),
  category: Joi.array()
    .items(Joi.string().valid(...allowedCategories))
    .optional()  // means this field is not required()
    .default([]),
});

// Server side validation for review
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

// Server side validation for user-signup
module.exports.userSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
