const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/ProductModel");
class Product {
  async create(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log("Files:");
      console.log(files[`image1`][0].mimetype.split("/")[1].toLowerCase());
      console.log(Object.keys(files).length);
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }
      const parsedData = JSON.parse(fields.data);
      const { title, price, discount, stock } = parsedData;

      // Validations
      const errors = [];
      if (!title || title.trim().length === 0) {
        errors.push({ msg: "Title is required" });
      }
      if (parseInt(price) < 1) {
        errors.push({ msg: "Price should be above $1" });
      }
      if (parseInt(discount) < 0) {
        errors.push({ msg: "Discount should not be negative" });
      }
      if (parseInt(stock) < 20) {
        errors.push({ msg: "Stock should be above 20" });
      }
      if (fields.description[0].trim().length === 0) {
        errors.push({ msg: "Description is required" });
      }
      if (!files["image1"]) {
        errors.push({ msg: "Image1 is required" });
      }
      if (!files["image2"]) {
        errors.push({ msg: "Image2 is required" });
      }
      if (!files["image3"]) {
        errors.push({ msg: "Image3 is required" });
      }

      if (errors.length !== 0) {
        return res.status(400).json({ errors });
      }
      // Processing images
      for (let i = 0; i < Object.keys(files).length; i++) {
        const file = files[`image${i + 1}`][0];
        const extension = file.mimetype.split("/")[1].toLowerCase();
        console.log(extension);
        if (!["jpeg", "jpg", "png"].includes(extension)) {
          errors.push({
            [`image${i + 1}`]: `Invalid image format for image${
              i + 1
            }. Only JPEG, JPG, and PNG are allowed.`,
          });
        }
      }
      if (errors.length !== 0) {
        return res.status(400).json({ errors });
      }
      // At this point, all validations passed, proceed with saving images
      const images = {};
      for (let i = 0; i < Object.keys(files).length; i++) {
        const file = files[`image${i + 1}`][0];
        const extension = file.mimetype.split("/")[1].toLowerCase();
        const imageName = uuidv4() + `.${extension}`;
        images[`image${i + 1}`] = imageName;
        const __dirname = path.resolve();
        const newPath = `${__dirname}/../client/public/images/${imageName}`;
        console.log(newPath);
        console.log(file.filepath);
        fs.copyFile(file.filepath, newPath, (err) => {
          if (err) {
            console.error(`Error uploading image${i + 1}:`, err);
          } else {
            console.log(`Image${i + 1} uploaded`);
          }
        });
      }

      // Respond with success
      if (errors.length === 0) {
        try {
          const response = await ProductModel.create({
            title: parsedData.title,
            price: parseInt(parsedData.price),
            discount: parseInt(parsedData.discount),
            stock: parseInt(parsedData.stock),
            category: parsedData.category,
            colors: parsedData.colors,
            sizes: JSON.parse(fields.sizes),
            image1: images["image1"],
            image2: images["image2"],
            image3: images["image3"],
            description: fields.description[0],
          });
          return res.status(201).json({ msg: "Product has created", response });
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      } else {
        return res.status(400).json({ errors });
      }
    });
  }
  async get(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await ProductModel.find({}).countDocuments();
      const response = await ProductModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      console.log(response);
      return res.status(200).json({ products: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = new Product();
