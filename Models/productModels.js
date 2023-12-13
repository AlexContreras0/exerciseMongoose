const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    enum: ["S", "M", "L", "XL"],
  },
  color: {
    type: [String],
  },
  brand: {
    type: String,
  },
});

const product = mongoose.model("Product", productSchema, "Product");

module.exports = product;
