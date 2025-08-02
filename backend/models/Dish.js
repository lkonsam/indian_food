const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  diet: String,
  prep_time: String,
  cook_time: String,
  flavor_profile: String,
  course: String,
  state: String,
  region: String,
  imageId: Number,
});

module.exports = mongoose.model("Dish", dishSchema);
