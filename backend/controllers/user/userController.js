const { validationResult } = require("express-validator");
const UserModel = require("../../models/User");
const {
  hashPassword,
  createToken,
  comparePassword,
} = require("../../services/authService");

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
          .status(201)
          .json({ message: "Your account has been registered", token });
      } else {
        return res.status(400).json({
          errors: [{ msg: `${email} is already taken`, path: "email" }],
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({ id: user._id, name: user.name });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: true });
          }
        } else {
          return res.status(400).json({
            errors: [{ msg: "password not matched!", path: "password" }],
          });
        }
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${email} is not found`, path: "email" }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
