const express = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../../validations/userValidations");
const { register, login } = require("../../controllers/user/userController");
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);

module.exports = router;
