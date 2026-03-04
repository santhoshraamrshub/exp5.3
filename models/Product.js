const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

const reviewSchema = new mongoose.Schema({
  userId: String,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: Number
});

module.exports = mongoose.model("Product", productSchema);