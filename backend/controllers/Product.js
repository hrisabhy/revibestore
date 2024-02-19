const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
class Product {
  async create(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
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
        errors.push({ title: "Title is required" });
      }
      if (parseInt(price) < 1) {
        errors.push({ price: "Price should be above $1" });
      }
      if (parseInt(discount) < 0) {
        errors.push({ discount: "Discount should not be negative" });
      }
      if (parseInt(stock) < 20) {
        errors.push({ stock: "Stock should be above 20" });
      }
      if (fields.description[0].trim().length === 0) {
        errors.push({ description: "Description is required" });
      }
      if (!files["image1"]) {
        errors.push({ image1: "Image1 is required" });
      }
      if (!files["image2"]) {
        errors.push({ image2: "Image2 is required" });
      }
      if (!files["image3"]) {
        errors.push({ image3: "Image3 is required" });
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
      for (let i = 0; i < Object.keys(files).length; i++) {
        const file = files[`image${i + 1}`][0];
        const extension = file.mimetype.split("/")[1].toLowerCase();
        const imageName = uuidv4() + `.${extension}`;
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
      res.json({ success: true });
    });
  }
}
module.exports = new Product();
