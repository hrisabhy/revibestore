const { validationResult } = require("express-validator");
const UserModel = require("../../models/User");

module.exports.register = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log(errors.array());
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
