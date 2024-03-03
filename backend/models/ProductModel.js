const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    discount: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    colors: {
      type: [Map],
    },
    sizes: {
      type: [Map],
    },
    image1: {
      required: true,
      type: String,
    },
    image2: {
      required: false,
      type: String,
    },
    image3: {
      required: false,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", productSchema);
