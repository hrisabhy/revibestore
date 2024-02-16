const { validationResult } = require("express-validator");
const UserModel = require("../../models/User");
const { hashPassword, createToken } = require("../../services/authService");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExists = await UserModel.findOne({ email: email });
      if (!emailExists) {
        const hashed = await hashPassword(password);
        const user = await UserModel.create({
          name,
          email,
          password: hashed,
          admin: true,
        });
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(200)
          .json({ message: "Your account has been registered", token });
      } else {
        return res.status(401).json({ message: "Email already used" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
