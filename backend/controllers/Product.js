const formidable = require("formidable");

class Product {
  async create(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (!err) {
        console.log("fields: ", fields);
        console.log("files: ", files);
      }
    });
  }
}

module.exports = new Product();
