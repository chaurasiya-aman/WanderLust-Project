const mongoose = require("mongoose");
const { Schema } = mongoose;
const passPortLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passPortLocalMongoose);

module.exports = mongoose.model("User", userSchema);
